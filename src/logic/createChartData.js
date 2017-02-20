
export default function (pollObj) {
	
	let options = pollObj.options,
		chartData = { labels:options, datasets: [ { label: '# of votes', data:[] } ] };
	
	if(pollObj.votes) {
		
		let dataArr = pollObj.votes.reduce((data,voteObj) => {
			
			let vote = voteObj.vote,
				ind = options.indexOf(vote);
			if(ind > -1) {
				data[ind] = data[ind] + 1 || 1;
			}
			return data;
		},new Array(options.length).fill(0));
		
		chartData.datasets[0].data = dataArr;
	}
	
	const numberWithCommas = function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
  
	const integersOnly = function(tick) {
		if(tick === Math.floor(tick)) {
			return numberWithCommas(tick);
		}  
	}
	
	
	return {data:chartData,options:{scales:{yAxes:[{ticks:{callback:integersOnly,suggestedMax:5,min:0}}]}}};
	
}