import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExperiencePage from './pages/ExperiencePage';
import OpenSourcePage from './pages/OpenSourcePage';
import SkillsPage from './pages/SkillsPage';
import HackathonsPage from './pages/HackathonsPage';
import ProjectsPage from './pages/ProjectsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/opensource" element={<OpenSourcePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/hackathons" element={<HackathonsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}
