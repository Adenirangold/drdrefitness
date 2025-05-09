import MemberList from "@/components/MemberList";
import Spinner from "@/components/Spinner";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<Spinner></Spinner>}>
        <MemberList></MemberList>
      </Suspense>
    </div>
  );
};

export default page;
