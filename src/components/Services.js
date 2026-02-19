import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { FaBrain, FaCode, FaRobot, FaChartLine, FaDatabase, FaCloud } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const ServicesSection = styled.section`
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 35px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.gradient};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.glow};

    &::before {
      transform: scaleX(1);
    }
  }
`;

const ServiceIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
  margin-bottom: 25px;
`;

const ServiceTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.text};
`;

const ServiceDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 20px;
`;

const ServiceFeatures = styled.ul`
  margin-bottom: 25px;
`;

const ServiceFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 10px;

  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

const ServiceLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: gap 0.3s ease;

  &:hover {
    gap: 12px;
  }
`;

const services = [
  {
    icon: <FaBrain />,
    title: 'Machine Learning Solutions',
    description: 'Custom ML models tailored to your business needs, from data preprocessing to deployment.',
    features: [
      'Custom model development',
      'Model optimization',
      'A/B testing & validation',
      'Production deployment',
    ],
  },
  {
    icon: <FaRobot />,
    title: 'Computer Vision',
    description: 'Advanced image and video analysis systems for object detection, segmentation, and recognition.',
    features: [
      'Object detection & tracking',
      'Image segmentation',
      'Facial recognition',
      'Medical image analysis',
    ],
  },
  {
    icon: <FaChartLine />,
    title: 'Predictive Analytics',
    description: 'Data-driven insights and forecasting to help you make informed business decisions.',
    features: [
      'Time series forecasting',
      'Risk assessment',
      'Customer analytics',
      'Demand prediction',
    ],
  },
  {
    icon: <FaCode />,
    title: 'Full Stack Development',
    description: 'Modern, responsive web applications with seamless user experiences.',
    features: [
      'React.js applications',
      'RESTful APIs',
      'Database design',
      'Cloud deployment',
    ],
  },
  {
    icon: <FaDatabase />,
    title: 'Data Engineering',
    description: 'Robust data pipelines and infrastructure for processing large-scale datasets.',
    features: [
      'ETL pipelines',
      'Data warehousing',
      'Real-time processing',
      'Data quality assurance',
    ],
  },
  {
    icon: <FaCloud />,
    title: 'MLOps & Deployment',
    description: 'End-to-end ML lifecycle management from development to production.',
    features: [
      'CI/CD for ML',
      'Model monitoring',
      'Auto-scaling solutions',
      'Cloud integration',
    ],
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <ServicesSection id="services" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTag
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            What I Offer
          </SectionTag>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            My <span>Services</span>
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Comprehensive AI and development services to transform your ideas into reality
          </SectionSubtitle>
        </SectionHeader>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceFeatures>
                {service.features.map((feature) => (
                  <ServiceFeature key={feature}>{feature}</ServiceFeature>
                ))}
              </ServiceFeatures>
              <ServiceLink href="#contact">
                Get Started <HiArrowRight />
              </ServiceLink>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default Services;
