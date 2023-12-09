import {
  ByteArray,
  Bytes,
  JSONValueKind,
  crypto,
  ipfs,
  json,
} from "@graphprotocol/graph-ts";
import { Content, SocialLink } from "../../generated/schema";

/* 
JSON FORMAT = {
    name: STRING
    contentType: IMG/TEXT
    contentCid: STRING   
    socials: [ {
        link:  "LINK TO INSTAGRAM"
        platform: "INSTAGRAM"
    }, {
        link: "LINK TO MEDIUM"
        platform: "MEDIUM"
    } ]
}
*/
export function formatIPFS(content: Content): Content {
  let data = ipfs.cat(content.contentCid.toString());
  if (data) {
    let formattedJSON = json.fromBytes(data);
    if (formattedJSON.kind == JSONValueKind.OBJECT) {
      let data = formattedJSON.toObject();
      let name = data.get("name");
      if (name) content.name = name.toString();
      let type = data.get("contentType");
      let dataCid = data.get("dataCid");
      if (
        type &&
        type.kind === JSONValueKind.STRING &&
        dataCid &&
        dataCid.kind === JSONValueKind.STRING
      ) {
        content.type = type.toString().toLowerCase() == "IMG" ? "IMG" : "TEXT";
        content.dataCid = dataCid.toString();
      }
      let socialData = data.get("socials");
      if (socialData && JSONValueKind.ARRAY == socialData.kind) {
        let socials = socialData.toArray();
        let socialLinkData: Array<Bytes> = [];
        for (let i = 0; i <= socials.length; i++) {
          if (socials[i].kind === JSONValueKind.OBJECT) {
            const data = socials[i].toObject();
            const platform = data.get("platform");
            const link = data.get("link");
            if (platform && link) {
              let id = crypto.keccak256(ByteArray.fromUTF8(link.toString()));
              let socialLink = new SocialLink(Bytes.fromByteArray(id));

              socialLink.platform = platform.toString();
              socialLink.link = link.toString();
              socialLink.save();
              socialLinkData.push(socialLink.id);
            }
          }
        }
        content.socials = socialLinkData;
      }
    }
    content.save();
    return content;
  }
  return content;
}
