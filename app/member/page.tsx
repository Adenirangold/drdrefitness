import { getAuthenticatedUser } from "@/lib/actions";

const page = async () => {
  const result = await getAuthenticatedUser();
  return <div> memberrrrr page</div>;
};

export default page;
