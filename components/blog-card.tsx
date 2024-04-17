import { urlFor } from "@/sanity/lib/client";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Container from "./container";

interface Props {
    posts: Post[];
}

const BlogCard = ({ posts }: Props) => {
    return (
        <div className="pt-[50px]">
            <div>
                <div className="my-10 grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                    {posts.map((post) => (
                        <div key={post?._id} className="col-span-4">
                            <Link href={{
                                pathname: `/blogs/${post?.slug?.current}`,
                                query: { slug: post?.slug?.current },
                            }}>
                                <div className="flex flex-col w-full items-start">
                                    <div className="relative w-full h-[300px] group-hover:shadow-lg">
                                        <Image src={urlFor(post?.mainImage).url()} fill alt="img" className="rounded-[10px] object-cover object-center" />
                                    </div>
                                    <div className="w-full mt-4 px-2">
                                        <span className="text-xs font-mono">{new Date(post?._createdAt).toLocaleDateString(
                                            "en-US", {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        }
                                        )}</span>
                                        <h2 className="font-medium text-xl mb-2">{post?.title}</h2>
                                        <p className="font-normal text-gray-500 text-sm">{post?.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
