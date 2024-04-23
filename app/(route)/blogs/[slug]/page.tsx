
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Post } from "@/types";
import { groq } from "next-sanity";
import { client, urlFor } from "@/sanity/lib/client";
import Container from "@/components/container";
import { RichText } from "@/components/rich-text";

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 1;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
        ...,
        body,
        author->
    }`;
  const post: Post = await client.fetch(query, { slug: params.slug });

  return {
    title: post?.title,
    description: post?.description,
    alternates: {
      canonical: `/blogs/${params.slug}`,
      languages: {
        "en-US": `/blogs/${params.slug}`,
      }
    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description: post?.description,
      images: [urlFor(post?.mainImage).url()],
      siteId: "0000328462",
      creator: "@nauman",
      creatorId: "328462"
    }
  };
}

export const generateStaticParams = async () => {
  const query = groq`*[_type == 'post']{
        slug
    }`;
  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug?.slug?.current);
  return slugRoutes?.map((slug) => ({
    slug,
  }));
};

const SlugPage = async ({ params: { slug } }: Props) => {
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
        ...,
        body,
        author->
    }`;
  const post: Post = await client.fetch(query, { slug });

  return (
    <Container className="pt-[100px]" >
      <div className="mt-2 px-4 flex gap-2">
        <Link href={'/blogs'} className="underline font-mono">
          Blogs
        </Link>
        <p>/</p>
        <p>{post?.title}</p>
      </div>
      <div className="mt-[120px]">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="w-full mb-6">
            <div className="w-full flex items-center justify-center mb-24">
              <div className=" max-w-[900px]">
                <h1 className="text-[54px] text-start font-medium">{post.title}</h1>
              </div>
            </div>
            <span className="text-[16px] font-mono text-gray-500">{new Date(post?._createdAt).toLocaleDateString(
              "en-US", {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }
            )}</span>
          </div>
          <div className="mb-6">
            <Image
              src={urlFor(post?.mainImage).url()}
              width={500}
              height={500}
              alt="main image"
              className="object-cover w-full rounded-[5px]"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="max-w-[770px] ">
              <div className="text-gray-700 leading-[24px] text-[16px] tracking-wide mb-8">
                <PortableText value={post?.body} components={RichText} />
              </div>
              <div className="flex gap-4 items-center mb-16">
                <div>
                  <Image src={urlFor(post?.author?.image).url()} width={50} height={50} alt="author_image" className="rounded-full" />
                </div>
                <div>
                  <p className="font-mono text-[14px] text-gray-500">Written by</p>
                  <h4 className="font-bold text-[18px]">{post?.author?.name}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SlugPage;