import { useEffect, useState, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';

export default function QuestionTwo() {
	const [count, setCount] = useState(0);
    //use memo hooks
	return (
		<div className="relative">
			<h1 className="text-xl mb-4">Loading Expensive Child Component</h1>
			<p className="text-muted-foreground mb-4 text-xs">Navigate to <span className="font-bold">/components/defects/question-two.tsx</span> to see the defects</p>
			<p>Parent component counter: {count}</p>
			<Button onClick={() => setCount(count + 1)}>Increment Counter</Button>
			<HeavyComponent data={{value: "Hello World"}} />
			
		</div>
	);
}


// Don't change this component
function HeavyComponent({data}: {data: {value: string}}) {
	const [loading, setLoading] = useState(true);
	const renderCount = useRef(0);

	useEffect(() => {
		setLoading(true); 
		renderCount.current += 1;
		
		const timer = setTimeout(() => {
			setLoading(false);
		}, 3000); 

		return () => {
			clearTimeout(timer);
		};
	}, [data]); 

	return (
		<div className="border p-4 mt-4 rounded">
			<div className="mb-2">
				Child Renders: {renderCount.current}
			</div>
			<div>
				{loading ? (
					<p>Child Component Loading, and it takes a while to load...</p>
				) : (
					<p>HeavyComponent with value: {data.value}</p>
				)}
			</div>
		</div>
	);
}
