import React, { useState, useEffect } from 'react';
import StatusTab from '../../components/tab';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ApexChart from '../../components/charts/chart';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ActiveJobData from '../../data/activeJobData';
import Job from '../../components/job';
import './style.scss';

export default function Footer() {
  const [count,setCount]=useState({});
  const [job,setJob]=useState([]);
	const [time, setTime] = useState(1);
	const [sort, setSort] = useState('recent');
	const [countReceived, setCountReceived] = useState([]);
	const [countApplied, setCountApplied] = useState([]);
	const handleChange = (event) => {
		setSort(event.target.value);
		handleSorting(event.target.value)
	};

  const getData = () => {
    fetch(`https://frightened-jade-kangaroo.cyclic.app/job`, {
     
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          res[i].posted = convertUTCtoIST(res[i].posted);
     
        }
        
        setJob(res)
      })    
      .catch((err) => console.log(err));
  };
  
  const chartData=()=>{
    fetch(`https://frightened-jade-kangaroo.cyclic.app/chartdata`,{  
    })
    .then((res) => res.json())
     .then((res) => {
       console.log(res);
       setCountReceived(res.countReceived)
       setCountApplied(res.countApplied)
     })    
   .catch((err) => console.log(err));
 }

  const countData=()=>{
     fetch(`https://frightened-jade-kangaroo.cyclic.app/count`,{  
     })
     .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCount(res[0])
      })    
    .catch((err) => console.log(err));
  }
  useEffect(() => {
    getData();
    countData();
    chartData();
  }, []);
  const convertUTCtoIST = (utcDateStr) => {
    const utcDate = new Date(utcDateStr);
    const istOffset = 330;
    const istDate = new Date(utcDate.getTime() + istOffset * 60000);
    return istDate.toUTCString();
  };


	useEffect(() => {
		if (time === 0) {
			setCountReceived(countReceived.slice(0, 7));
			setCountApplied(countApplied.slice(0, 7));
		} else {
			setCountReceived(countReceived);
			setCountApplied(countApplied);
		}
	}, [time]);
	const ApexChartWrapper = ({ countReceived, countApplied }) => {
		return <ApexChart countReceived={countReceived} countApplied={countApplied} />;
	};
   

	const [data, setData] = useState(ActiveJobData.jobData);
	const [sortCriteria, setSortCriteria] = useState('');
	const sortData = (array, criteria) => {
		const sortedArray = [...array];
		switch (criteria) {
		case 'name':
			sortedArray.sort((a, b) => a.name.localeCompare(b.name));
			break;
		case 'recent':
			sortedArray.sort((a, b) => new Date(b.dateFormat) - new Date(a.dateFormat));
			break;
		default:
			break;
		}
		return sortedArray;
	};
	const handleSorting = (criteria) => {
		setSortCriteria(criteria);
	
		const sortedData = sortData(data, criteria);
		setData(sortedData);
	};
  return (
    <div className="home-page">
      <div className="page-header">
        <div className="container">
          <h1>Hello, Paramedic Medical Supplies</h1>
          <Button variant="contained" onClick={() => alert('Want to post a job?')}>
            Post a Job
          </Button>
          <div className="tabs">
		  	<StatusTab name="Active Jobs" count={count.active_job} />
            <StatusTab name="New Application" count={count.new_application} />
            <StatusTab name="Candidate To Be Reviewed" count={count.candidate_reviewed} />
            <StatusTab name="Shortlisted" count={count.shortlisted} />
          </div>
        </div>
      </div>
      <div className="main-page">
        <div className="container">
          <h2>Applications Received</h2>
          <ButtonGroup variant="contained">
            <Button
              style={time === 0 ? { color: '#6390DF', fontWeight: '700', backgroundColor: '#F5F8FE' } : {}}
              onClick={() => {
                setTime(0);
              }}
            >
              Weekly
            </Button>
            <Button
              style={time === 1 ? { color: '#6390DF', fontWeight: '700', backgroundColor: '#F5F8FE' } : {}}
              onClick={() => {
                setTime(1);
              }}
            >
              Monthly
            </Button>
          </ButtonGroup>
        </div>
        <div className="container chart">
          <div className="chart-container">
			<ApexChartWrapper countReceived={countReceived} countApplied={countApplied} />
          </div>
        </div>
        <div className="container">
          <h2>Active Jobs </h2>
          <div className="select">
            <p>Sort By: </p>
            <Select displayEmpty inputProps={{ 'aria-label': 'Without label' }} value={sort} onChange={handleChange}>
              <MenuItem value={'recent'}>Recent</MenuItem>
              <MenuItem value={'name'}>Name</MenuItem>
            </Select>
          </div>
        </div>
		<div className="container">
			<div className="jobs">
				{job.map((item, index) => (
					<Job key={index} data={item} />
				))}
			</div>
		</div>
      </div>
    </div>
  );
}
