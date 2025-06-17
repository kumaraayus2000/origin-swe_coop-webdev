import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

export default function QuestionOne() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const renderCount = useRef(0);


	const fetchData = async () => {
		const res = await fetch('/api/questions/1');
		const json = await res.json();

		setData(json);
		setLoading(false);
		renderCount.current += 1;
	};

	useEffect(() =>{
			fetchData();

	},[]);
	// okfetchData();

	if (renderCount.current > 500) {
		throw new Error(`Too many renders detected: ${renderCount.current}. Infinite re-render loop prevented. \nNavigate to /components/defects/question-one.tsx to see the defects`);
	}

	return (
		<div className="relative">
			<Badge 
				variant="destructive" 
				className="absolute top-0 right-0 z-10"
			>
				Renders: {renderCount.current}
			</Badge>
			<h1 className="text-xl mb-4">Data List</h1>
			<p className="text-muted-foreground mb-4 text-xs">Navigate to <span className="font-bold">/components/defects/question-one.tsx</span> to see the defects</p>
			{loading ? (
				<p>Loading...</p>
			) : (
				<ul>
				{data.map((item: any, index: number) => (
					<li key={index}>{item.name}</li>
				))}
				</ul>
			)}
		</div>
	);
}
