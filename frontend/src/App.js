import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import Mainpage from './components/Mainpage/Mainpage';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';

function App() {
  const [projects, setProjects] = useState({});
  const [activeProject, setActiveProject] = useState('BC2407');

  useEffect(() => {
    setProjects({
      'BC2407': {
        project_title: 'Analytics II: Predictive Techniques & Analysis in Healthcare',
        project_desc: 'Most organizations are data rich and information poor. The large volumes of data in an organization are “oilfields” rich in information content that are pending extraction with the right tools and models. Analytics involves the art of data exploration, visualization, communication and the science of analyzing large quantities of data in order to discover meaningful patterns and useful insights to support decision-making. The primary objective of this course is to introduce students to various techniques available to extract useful insights from the large volumes of data. At the end of the course, students will not only see the substantial opportunities that exist in real world, but also learn techniques that allow them to exploit these opportunities.',
        project_members: [1001, 1002, 1003, 1004, 1005],
        project_tasks: [
          {
            title: 'Exploratory Data Analysis',
            date: '26/02',
            assigned: 1001,
            completed: true
          },
          {
            title: 'Data Modelling',
            date: '09/03',
            assigned: 1002,
            completed: false
          },
          {
            title: 'Technical Documentation',
            date: '11/02',
            assigned: 1003,
            completed: false
          }
        ]
      },
      'CC0006': {
        project_title: 'Sustainability: Society, Economy and Environment',
        project_desc: 'Systematically analyse major current sustainability challenges from the perspectives of society, economy, and the environment, with specific focus on Singapore. The course aims to stimulate critical thinking, curiosity, and the ability to structure and synthesise knowledge through the lens of sustainability. Emphasis is on the need to address sustainability issues from different perspectives and at different scales, reinforced by concrete examples such as palm oil production, waste management, pollution & human consumption, and climate change',
        project_members: [1001, 1002, 1003],
        project_tasks: [
          {
            title: 'Site Visit',
            date: '24/02',
            assigned: 1001,
            completed: true
          },
          {
            title: 'Proposal Draft 1',
            date: '26/02',
            assigned: 1003,
            completed: true
          },
          {
            title: 'Consultation',
            date: '09/03',
            assigned: 1001,
            completed: false
          },
          {
            title: 'Proposal Draft 2',
            date: '29/03',
            assigned: 1002,
            completed: false
          },
          {
            title: 'Final Report',
            date: '21/04',
            assigned: 1001,
            completed: false
          }
        ]
      }
    });
  }, []);

  function handleAdd(project_id) {
    const projectsClone = structuredClone(projects);
    projectsClone[project_id] = {
      project_title: '',
      project_desc: '',
      project_members: [],
      project_tasks: []
    }
    setProjects(projectsClone);
  }

  function handleDelete(project_id) {
    const projectsClone = structuredClone(projects);
    console.log('deleting', project_id);
    delete projectsClone[project_id];
    setProjects(projectsClone);
  }

  function handleSet(project_id) {
    setActiveProject(project_id);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/calendar" element={<div><Navbar />
          <Sidebar handleDelete={handleDelete} handleAdd={handleAdd} handleSet={handleSet} projects={projects} /><Calendar /></div>} />
        <Route path="/home" element={<div><Navbar />
          <Sidebar handleDelete={handleDelete} handleAdd={handleAdd} handleSet={handleSet} projects={projects} /><Mainpage project={projects[activeProject]} /></div>} />
      </Routes>
    </div>
  );
}

export default App;