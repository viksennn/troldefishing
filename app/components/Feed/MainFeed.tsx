import { PAGE_URL } from "@/app/url";
import { PostFeed } from "./PostFeed";
import { PostForm } from "./PostForm";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export const MainFeed = async () => {
    const postUrl = `${PAGE_URL}/api/posts`;
    const postRes = await fetch(postUrl, { cache: "no-store" });
    const postData = await postRes.json();

    const flippedData = postData.reverse();

    const sessionUser = await getServerSession(authOptions);
    const userId = sessionUser?.user?.id as string;

    return (
        <div className="flex flex-col gap-8 lg:gap-2">
            <PostForm userId={userId} />
            <PostFeed postData={flippedData} userId={userId}/>
        </div>
    );
};
