import { PostItem } from "./PostItem"

export const PostFeed = ({ postData, userData, userId }: any) => {
    return (
        <div>
            <div>
                {postData.map((post: any) => (
                    <PostItem key={post._id} data={post} userData={userData} userId={userId} />
                ))}
            </div>
        </div>
    );
};
