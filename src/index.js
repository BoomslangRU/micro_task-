import { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

const userID = [1, 2]

const ViewFakeData = ({ userID }) => {

	const [content, setContent] = useState([])
	// const [one, two] = userID

	const baseURL = 'https://jsonplaceholder.typicode.com/users/'

	const loadData = async () => {
		// fetchData
		await userID.forEach(id => {
			fetch(baseURL + id + '/todos')
				.then(response => {
					response.json().then(data => {
						return setContent(content => [...content, data])
					})
				})
		})
	}
	return (
		<section className='fake-data_wrap'>
			<h3>Todos list users</h3>
			<button onClick={loadData} disabled={content.length > 0}>Load</button>
			<div className='fake-data_content'>
				{content.length > 0 ?
					content.flat().map(item => {
						return (
							<div className='fake-data_lists' key={item.id}>
								<div>{item.userId}</div>
								<div>{item.id}</div>
								<div>{item.title}</div>
								<div>{item.completed ? 'completed' : 'not completed'}</div>
							</div>
						)
					})
					:
					<div className='fake-data_no-data'>
						No content
					</div>
				}
			</div>
		</section>
	)
}

ReactDOM.render(<ViewFakeData userID={userID} />, document.querySelector('#app'))