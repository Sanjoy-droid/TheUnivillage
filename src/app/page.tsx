import PeopleToFollow from "./CustomComponents/PeopleToFollow";
import { currentUser } from "@clerk/nextjs/server";
import CreatePost from "./CustomComponents/CreatePost";
import PostCard from "./CustomComponents/PostCard";
import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import Footer from "./CustomComponents/Footer";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main content feed */}
        <div className="md:col-span-7 lg:col-span-7 xl:col-span-7 order-2 md:order-2">
          {/* Only show CreatePost if user is signed in */}

          {user ? <CreatePost /> : null}
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} dbUserId={dbUserId} />
            ))}
          </div>
        </div>
        {/* People to follow - Always visible */}
        <div className="md:col-span-5 lg:col-span-5 xl:col-span-5 order-3 md:order-3">
          <div className="sticky top-20">
            <PeopleToFollow />
          </div>
        </div>
      </div>
    </>
  );
}
