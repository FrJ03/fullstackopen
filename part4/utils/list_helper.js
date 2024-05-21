const lCollections = require('lodash/collection')
const lObject = require('lodash/object')

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
        return {}
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

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return {}
    }
    else{
        const  occurrences = lCollections.countBy(blogs, 'author')
        let occurrencesList = [] 
        lObject.forIn(occurrences, (value, key) => {
            occurrencesList.push({
                author: key,
                blogs: value
            })
        })
        occurrencesList.sort((a, b) => {
            return b.blogs - a.blogs
        })
        return occurrencesList[0]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}