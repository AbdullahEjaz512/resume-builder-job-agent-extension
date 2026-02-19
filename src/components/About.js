import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBrain, FaCode, FaRobot, FaLightbulb } from 'react-icons/fa';
import profileImage from '../assets/profile.png';

const AboutSection = styled.section`
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
  margin-bottom: 60px;
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

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const AboutImageWrapper = styled(motion.div)`
  position: relative;
`;

const AboutImage = styled.div`
  position: relative;
  
  img {
    width: 100%;
    max-width: 450px;
    border-radius: 20px;
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: 20px;
    bottom: 20px;
    border: 3px solid ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
    z-index: -1;
  }
`;

const AboutContent = styled(motion.div)``;

const AboutText = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.9;
  margin-bottom: 25px;
`;

const HighlightCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 25px;
  display: flex;
  gap: 15px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  min-width: 50px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: white;
`;

const CardContent = styled.div`
  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-wrap: wrap;
    gap: 25px;
  }
`;

const StatItem = styled(motion.div)`
  h3 {
    font-size: 2.5rem;
    font-weight: 800;
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.95rem;
  }
`;

const highlights = [
  {
    icon: <FaBrain />,
    title: 'AI & ML Expert',
    description: 'Deep expertise in neural networks and ML algorithms',
  },
  {
    icon: <FaRobot />,
    title: 'Computer Vision',
    description: 'Building intelligent image & video analysis systems',
  },
  {
    icon: <FaCode />,
    title: 'Full Stack Dev',
    description: 'Creating responsive and modern web applications',
  },
  {
    icon: <FaLightbulb />,
    title: 'Problem Solver',
    description: 'Turning complex problems into elegant solutions',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTag
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            About Me
          </SectionTag>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Passionate <span>AI Developer</span> & Innovator
          </SectionTitle>
        </SectionHeader>

        <AboutGrid>
          <AboutImageWrapper
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <AboutImage>
              <img src={profileImage} alt="About Me" />
            </AboutImage>
          </AboutImageWrapper>

          <AboutContent
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <AboutText>
              I'm a passionate AI Developer with extensive experience in Machine Learning, 
              Deep Learning, and Computer Vision. My journey in technology began with a 
              fascination for how machines can learn and make intelligent decisions.
            </AboutText>
            <AboutText>
              I specialize in building end-to-end AI solutions, from data preprocessing 
              and model training to deployment and optimization. Whether it's developing 
              neural networks for image recognition, creating NLP models, or building 
              full-stack applications, I bring creativity and technical excellence to 
              every project.
            </AboutText>
            <AboutText>
              My goal is to leverage AI to solve real-world problems and create 
              meaningful impact. I'm constantly exploring new technologies and 
              pushing the boundaries of what's possible with artificial intelligence.
            </AboutText>

            <HighlightCards>
              {highlights.map((item, index) => (
                <HighlightCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <CardIcon>{item.icon}</CardIcon>
                  <CardContent>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </CardContent>
                </HighlightCard>
              ))}
            </HighlightCards>

            <Stats>
              <StatItem
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3>3+</h3>
                <p>Years Experience</p>
              </StatItem>
              <StatItem
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3>20+</h3>
                <p>Projects Completed</p>
              </StatItem>
              <StatItem
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h3>15+</h3>
                <p>Happy Clients</p>
              </StatItem>
            </Stats>
          </AboutContent>
        </AboutGrid>
      </Container>
    </AboutSection>
  );
};

export default About;
