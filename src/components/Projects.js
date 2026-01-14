import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaBrain, FaEye, FaChartLine } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
// Updated: January 14, 2026

const ProjectsSection = styled.section`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SectionTag = styled(motion.span)`
  display: inline-block;
  padding: 8px 20px;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 15px;

  span {
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const FilterButtons = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  background: ${({ active, theme }) => 
    active ? theme.colors.gradient : theme.colors.card};
  color: ${({ active, theme }) => 
    active ? 'white' : theme.colors.textSecondary};
  border: 1px solid ${({ active, theme }) => 
    active ? 'transparent' : theme.colors.border};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.glowStrong};
  }
`;

const ProjectImage = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundTertiary};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.gradient};
    opacity: 0.8;
    z-index: 1;
  }
`;

const ProjectIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  color: white;
  z-index: 2;
  opacity: 0.9;
`;

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  z-index: 3;
`;

const OverlayButton = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 6px 14px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 4;
`;

const ProjectContent = styled.div`
  padding: 25px;
`;

const ProjectCategory = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin: 10px 0 15px;
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 20px;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TechTag = styled.span`
  padding: 6px 14px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 6px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

const projects = [
  {
    id: 1,
    title: 'FYP: Seg-Mind: Brain Tumor Analysis',
    category: 'Computer Vision',
    description: 'Advanced brain tumor segmentation, classification, and growth prediction system with 3D visualization and explainable AI. Achieved 94% accuracy in tumor detection.',
    tech: ['Python', 'PyTorch', 'OpenCV', '3D Visualization', 'XAI'],
    icon: <FaBrain />,
    featured: true,
    filter: 'ai',
    github: '#',
    demo: 'http://fyp-1-st56.vercel.app/',
  },
  {
    id: 2,
    title: 'Real-time Object Detection',
    category: 'Deep Learning',
    description: 'Custom YOLO-based object detection system optimized for edge devices. Achieves 60 FPS on embedded hardware with high accuracy.',
    tech: ['Python', 'YOLO', 'TensorFlow', 'CUDA', 'OpenCV'],
    icon: <FaEye />,
    featured: false,
    filter: 'ai',
    github: '#',
    demo: '#',
  },
  {
    id: 3,
    title: 'All-in-One Job Agent',
    category: 'GenAI & Automation',
    description: 'Agentic AI system utilizing local LLMs (Ollama) to autonomously generate context-aware professional documents. Includes autonomous browsing and ATS optimization engine.',
    tech: ['Python', 'Ollama', 'LLMs', 'Agentic AI', 'Automation'],
    icon: <FaBrain />,
    featured: true,
    filter: 'ai',
    github: '#',
    demo: 'https://vercel.com/abdullah-ejazs-projects-5af9d263/resume-builder-job-agent-extension',
  },
  {
    id: 4,
    title: 'AI Image Generator',
    category: 'Generative AI',
    description: 'Text-to-image generation platform using diffusion models. Includes custom fine-tuning capabilities and style transfer features.',
    tech: ['Python', 'Stable Diffusion', 'PyTorch', 'React'],
    icon: <HiSparkles />,
    featured: true,
    filter: 'ai',
    github: '#',
    demo: '#',
  },
  {
    id: 5,
    title: 'E-Commerce Dashboard',
    category: 'Web Development',
    description: 'Full-stack e-commerce analytics dashboard with real-time insights, inventory management, and AI-powered demand forecasting.',
    tech: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'ML'],
    icon: <FaChartLine />,
    featured: false,
    filter: 'web',
    github: '#',
    demo: '#',
  },
  {
    id: 6,
    title: 'Medical Image Classifier',
    category: 'Healthcare AI',
    description: 'CNN-based medical image classification for X-ray and MRI scans. Supports multiple disease detection with explainable predictions.',
    tech: ['Python', 'TensorFlow', 'Grad-CAM', 'Flask', 'Docker'],
    icon: <FaBrain />,
    featured: false,
    filter: 'ai',
    github: '#',
    demo: '#',
  },
];

const filters = ['All', 'AI', 'Web'];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.filter.toLowerCase() === activeFilter.toLowerCase());

  return (
    <ProjectsSection id="projects" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTag
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            My Work
          </SectionTag>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Featured <span>Projects</span>
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Showcasing my expertise in AI, Machine Learning, and Full-Stack Development
          </SectionSubtitle>
        </SectionHeader>

        <FilterButtons
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </FilterButton>
          ))}
        </FilterButtons>

        <ProjectsGrid layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <ProjectImage>
                  <ProjectIcon>{project.icon}</ProjectIcon>
                  {project.featured && (
                    <FeaturedBadge>
                      <HiSparkles /> Featured
                    </FeaturedBadge>
                  )}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <ProjectOverlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <OverlayButton
                          href={project.github}
                          target="_blank"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaGithub />
                        </OverlayButton>
                        <OverlayButton
                          href={project.demo}
                          target="_blank"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaExternalLinkAlt />
                        </OverlayButton>
                      </ProjectOverlay>
                    )}
                  </AnimatePresence>
                </ProjectImage>

                <ProjectContent>
                  <ProjectCategory>{project.category}</ProjectCategory>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <TechStack>
                    {project.tech.map((tech) => (
                      <TechTag key={tech}>{tech}</TechTag>
                    ))}
                  </TechStack>
                </ProjectContent>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
