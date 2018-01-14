import axios from 'axios'

const baseURL = `http://localhost:9001/posts`

export function fetchPosts() {
	return axios.get(baseURL)
}