import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { 
  SiPython, SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn,
  SiKeras, SiNumpy, SiPandas, SiJupyter, SiDocker,
  SiReact, SiJavascript, SiHtml5, SiCss3, SiNodedotjs,
  SiGit, SiMongodb, SiPostgresql, SiAmazon, SiGooglecloud
} from 'react-icons/si';
import { FaBrain } from 'react-icons/fa';

const SkillsSection = styled.section`
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

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 35px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
`;

const CategoryIcon = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
`;

const CategoryTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const SkillsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    transform: translateX(5px);

    .skill-icon {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SkillIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.3s ease;
`;

const SkillInfo = styled.div`
  flex: 1;

  h4 {
    font-size: 0.95rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 3px;
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 2px;
`;

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    icon: <FaBrain />,
    skills: [
      { name: 'Python', icon: <SiPython />, level: 95 },
      { name: 'TensorFlow', icon: <SiTensorflow />, level: 90 },
      { name: 'PyTorch', icon: <SiPytorch />, level: 88 },
      { name: 'Scikit-learn', icon: <SiScikitlearn />, level: 92 },
      { name: 'Keras', icon: <SiKeras />, level: 90 },
      { name: 'OpenCV', icon: <SiOpencv />, level: 85 },
    ],
  },
  {
    title: 'Data Science',
    icon: <SiJupyter />,
    skills: [
      { name: 'NumPy', icon: <SiNumpy />, level: 95 },
      { name: 'Pandas', icon: <SiPandas />, level: 93 },
      { name: 'Jupyter', icon: <SiJupyter />, level: 90 },
      { name: 'Data Visualization', icon: <SiPython />, level: 88 },
      { name: 'Statistical Analysis', icon: <SiPython />, level: 85 },
      { name: 'Feature Engineering', icon: <SiPython />, level: 87 },
    ],
  },
  {
    title: 'Web Development',
    icon: <SiReact />,
    skills: [
      { name: 'React.js', icon: <SiReact />, level: 88 },
      { name: 'JavaScript', icon: <SiJavascript />, level: 85 },
      { name: 'HTML5', icon: <SiHtml5 />, level: 90 },
      { name: 'CSS3', icon: <SiCss3 />, level: 88 },
      { name: 'Node.js', icon: <SiNodedotjs />, level: 80 },
      { name: 'MongoDB', icon: <SiMongodb />, level: 78 },
    ],
  },
  {
    title: 'Tools & Cloud',
    icon: <SiDocker />,
    skills: [
      { name: 'Git', icon: <SiGit />, level: 90 },
      { name: 'Docker', icon: <SiDocker />, level: 82 },
      { name: 'AWS', icon: <SiAmazon />, level: 75 },
      { name: 'Google Cloud', icon: <SiGooglecloud />, level: 78 },
      { name: 'PostgreSQL', icon: <SiPostgresql />, level: 80 },
      { name: 'MLOps', icon: <SiDocker />, level: 75 },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <SkillsSection id="skills" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTag
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            My Skills
          </SectionTag>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Technical <span>Expertise</span>
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A comprehensive toolkit for building intelligent AI solutions 
            and modern web applications
          </SectionSubtitle>
        </SectionHeader>

        <SkillsGrid>
          {skillCategories.map((category, catIndex) => (
            <SkillCategory
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * catIndex }}
            >
              <CategoryHeader>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryHeader>

              <SkillsList>
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 * catIndex + 0.05 * skillIndex }}
                  >
                    <SkillIcon className="skill-icon">{skill.icon}</SkillIcon>
                    <SkillInfo>
                      <h4>{skill.name}</h4>
                      <SkillLevel>
                        <SkillProgress
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.3 + 0.1 * skillIndex }}
                        />
                      </SkillLevel>
                    </SkillInfo>
                  </SkillItem>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
