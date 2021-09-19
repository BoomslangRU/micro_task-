import axios from 'axios'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

const userID = [1, 2]

const ViewFakeData = ({ userID }) => {

	const [content, setContent] = useState([])

	const loadData = () => {
		const baseURL = 'https://jsonplaceholder.typicode.com/users/'
		const requests = userID.map(id => axios(`${baseURL}${id}/todos`))

		Promise.all(requests)
			.then(response => {
				const result = response.map(r => r.data).flat()
				setContent(result)
			})
	}
	return (
		<section className='fake-data_wrap'>
			<h3>Todos list users</h3>
			<button onClick={loadData} disabled={content.length > 0}>Load</button>
			<div className='fake-data_content'>
				{content.length > 0 ?
					content.map(item => {
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