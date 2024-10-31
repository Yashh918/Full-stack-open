const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    let favBlog = {}
    let maxLikes = 0


    blogs.forEach(blog => {
        if (blog.likes > maxLikes) {
            favBlog = blog
            maxLikes = blog.likes
        }
    });

    return favBlog
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const authorBlogCount = {}

    blogs.forEach(blog => {
        const author = blog.author
        authorBlogCount[author] = (authorBlogCount[author] || 0) + 1
    })

    let maxBlogs = 0
    let topAuthor = ''

    for (const author in authorBlogCount) {
        if (authorBlogCount[author] > maxBlogs) {
            maxBlogs = authorBlogCount[author]
            topAuthor = author
        }
    }

    return {
        author: topAuthor,
        blogs: maxBlogs
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const authorLikeCount = {}

    blogs.forEach(blog => {
        const author = blog.author
        const likes = blog.likes
        authorLikeCount[author] = (authorLikeCount[author] || 0) + likes
    })

    let maxLikes = 0
    let topAuthor = ''

    for(const author in authorLikeCount){
        if(authorLikeCount[author] > maxLikes){
            maxLikes = authorLikeCount[author]
            topAuthor = author
        }
    }

    return {
        author: topAuthor,
        likes: maxLikes
    }
}

export default {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}  