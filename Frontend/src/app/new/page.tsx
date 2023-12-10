import { AlertDialogTitle } from "@/components/ui/AlertDialog";
import { Button } from "@/components/ui/Button";
import SelectButton from "@/components/ui/SelectButton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  return (
    <div className="flex flex-col items-center ">
      <div className="font-bold">Verification Form</div>
      <div className="w-[75vw] bg-white border border-black border-2 p-10 rounded-lg items-center flex flex-col">
        <div className="flex-col items-center">
          Thank you for reaching out. In order to verify your content, we
          require some
          <br />
          essential details from your end. Kindly provide the following
          information:
        </div>
        <div className="w-[80%] flex flex-col mt-10 gap-y-5">
          <div className="w-fit gap-y-2">
            <div className="font-bold">Content Type *</div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select the content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Article</SelectItem>
                  <SelectItem value="banana">Image</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-fit gap-y-2">
            <div className="font-bold">Upload media/attachments</div>
            <Input type="file" accept="image/*"></Input>
          </div>

          <div className="w-full gap-y-2">
            <div className="font-bold">Link (if content is an article)</div>
            <Input type="text"></Input>
          </div>
          <div className="w-full gap-y-2">
            <div className="font-bold">Social Media Links</div>
            <Input type="text"></Input>
          </div>
          <div className="w-full gap-y-2">
            <div className="font-bold">
              Supporting Documents (Proof of Ownership)
            </div>
            <div>
              Attach any relevant documents, screenshots, or evidence supporting
              your claim.
            </div>
            <Input type="file" multiple></Input>
          </div>
          <Button variant={"secondary"}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
