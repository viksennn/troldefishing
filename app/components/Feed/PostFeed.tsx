import { PostItem } from "./PostItem"

export const PostFeed = ({ postData, userId }: any) => {
    return (
        <div>
            <div>
                {postData.map((post: any) => (
                    <PostItem key={post._id} data={post} sessionUserId={userId} />
                ))}
            </div>
        </div>
    );
};
