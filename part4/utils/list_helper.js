const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return null
    }
    else{
        let sortedBlogs = [...blogs]
        sortedBlogs.sort((a,b) => {
            return b.likes - a.likes
        })
        return {
                    title: sortedBlogs[0].title,
                    author: sortedBlogs[0].author,
                    likes: sortedBlogs[0].likes
                }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}