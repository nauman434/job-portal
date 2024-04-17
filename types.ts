type Base = {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
};

export interface Post extends Base {
    author: Author;
    body: Block[];
    categories: Category_Blog[];
    mainImage: {
        _type: "image";
        asset: {
            _type: "reference";
            current: string; // assuming this is the URL
        };
    };
    slug: Slug;
    title: string;
    description: string;
}

export interface Image {
    id: string;
    url: string;
}

interface Author extends Base {
    description: string;
    image: Image;
    name: string;
    slug: Slug;
}

interface Image_Blog {
    _type: "image";
    asset: Reference;
}

interface Reference {
    _type: "slug";
    current: string;
}

interface Slug {
    _type: "slug";
    current: string;
}

interface Block {
    _key: string;
    _type: "block";
    children: Span[];
    markDefs: any[];
    style: "normal" | "h1" | "h2" | "h3" | "h4" | "bloackquote";
}

interface Span {
    _key: string;
    _type: "span";
    marks: string[];
    text: string;
}

interface Category_Blog extends Base {
    description: string;
    title: string;
}