import { prisma } from "@/lib/prisma";
import Image from "next/image";
import PeopleToFollow from "./CustomComponents/PeopleToFollow";
import { currentUser } from "@clerk/nextjs/server";
import CreatePost from "./CustomComponents/CreatePost";
import PostCard from "./CustomComponents/PostCard";
import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main content feed - always shown and scales with screen */}
        <div className="md:col-span-7 lg:col-span-7 xl:col-span-7 order-2 md:order-2">
          {user ? <CreatePost /> : null}
          <div className="space-y-6">
            {/* Post cards Section */}
            {posts.map((post) => (
              <PostCard key={post.id} post={post} dbUserId={dbUserId} />
            ))}
          </div>
        </div>

        {/* People to follow - now visible on all screen sizes */}
        <div className="md:col-span-5 lg:col-span-5 xl:col-span-5 order-3 md:order-3">
          <div className="sticky top-20">
            <PeopleToFollow />
          </div>
        </div>
      </div>
    </>
  );
}
