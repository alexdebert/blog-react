import axios from 'axios'

const baseURL = `http://localhost:9001/posts/`

function fetchPost(id) {
	return axios.get(baseURL + id)
}

function fetchComments(id) {
	return axios.get(baseURL + id + `/comments`)
}

export function fetchPostDetail(id) {
	return axios.all([fetchPost(id), fetchComments(id)])
		.then(function(arr){
			return {
				post: arr[0].data,
				comments: arr[1].data
			}
		})
}

export function postComment(id, comment) {
	return axios.post(baseURL + id + `/comments`, comment)
}

