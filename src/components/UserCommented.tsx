import { Typography } from "antd";
import { BsEmojiDizzyFill, BsEmojiKissFill, BsEmojiLaughingFill, BsFillEmojiDizzyFill } from "react-icons/bs";

const UserHasCommented = () => {
  return (
    <>
      <Typography.Title level={4}>
        <span className="text-green-600">Thank you!!   
        <span className="flex flex-row gap-2">
        <BsEmojiKissFill color=""/>
        <BsEmojiDizzyFill color="#f5bf42"/>
        <BsEmojiLaughingFill color="red" />
        <BsFillEmojiDizzyFill color="blue" />

        </span>   </span> <br />
        You have already commented on this orchid.
      </Typography.Title>
    </>
  );
};

export default UserHasCommented;
