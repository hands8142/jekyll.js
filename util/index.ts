import matter from 'gray-matter'

export async function getAllPosts(){
    const context = require.context('../_posts', false, /\.md$/)
    const posts = []
    for(const key of context.keys()){
        const post = key.slice(2);
        const content = await import(`../_posts/${post}`);
        const meta = matter(content.default)
        meta.data.date = String(meta.data.date)
        posts.push({
            slug: post.replace('.md',''),
            title: meta.data.title,
            description: meta.data.description,
            date: meta.data.date
        })
    }
    return posts;
}

export async function getPostBySlug(slug){
    const fileContent = await import(`../_posts/${slug}.md`)
    const meta = matter(fileContent.default)
    meta.data.date = String(meta.data.date)
    const categories = meta.data.categories.split(" ");
    return {
        title: meta.data.title,
        content: meta.content,
        categories,
        date: meta.data.date
    }
}