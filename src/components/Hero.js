import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import profileImage from '../assets/profile.png';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 80px;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
`;

const HeroContent = styled.div`
  z-index: 10;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 2;
  }
`;

const Greeting = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }

  span {
    display: inline-block;
    animation: wave 2.5s infinite;
    transform-origin: 70% 70%;
  }

  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    10% { transform: rotate(14deg); }
    20% { transform: rotate(-8deg); }
    30% { transform: rotate(14deg); }
    40% { transform: rotate(-4deg); }
    50% { transform: rotate(10deg); }
    60%, 100% { transform: rotate(0deg); }
  }
`;

const Name = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 10px;
  line-height: 1.1;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }

  span {
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const TypedWrapper = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 25px;
  min-height: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 35px;
  max-width: 500px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0 auto 35px;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    transform: translateY(-3px);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.3rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const HeroImageWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 1;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 300px;
    height: 300px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.glowStrong};
`;

const ScrollIndicator = styled(motion.a)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  cursor: pointer;

  svg {
    font-size: 1.5rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(10px); }
    60% { transform: translateY(5px); }
  }
`;

const GlowOrb = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  filter: blur(60px);
  z-index: 0;
`;

const Hero = () => {
  return (
    <HeroSection id="home">
      <GlowOrb
        initial={{ x: -200, y: -100 }}
        animate={{ x: -150, y: -50 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        style={{ top: '10%', left: '10%' }}
      />
      <GlowOrb
        initial={{ x: 100, y: 100 }}
        animate={{ x: 150, y: 50 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        style={{ bottom: '10%', right: '10%' }}
      />

      <HeroContainer>
        <HeroContent>
          <Greeting
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span>👋</span> Hello, I'm
          </Greeting>

          <Name
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span>Abdullah Ejaz</span>
          </Name>

          <TypedWrapper>
            <TypeAnimation
              sequence={[
                'Machine Learning Engineer',
                2000,
                'Deep Learning Specialist',
                2000,
                'Computer Vision Expert',
                2000,
                'Full Stack Developer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </TypedWrapper>

          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            I specialize in building intelligent AI solutions, from neural networks 
            and computer vision systems to full-stack web applications. Let's bring 
            your ideas to life with cutting-edge technology.
          </Description>

          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PrimaryButton
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Work Together
            </PrimaryButton>
            <SecondaryButton
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Download CV
            </SecondaryButton>
          </ButtonGroup>

          <SocialLinks
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <SocialLink
              href="https://github.com/AbdullahEjaz512"
              target="_blank"
              whileHover={{ y: -5 }}
            >
              <FaGithub />
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/abdullah-ejaz-7b4791311"
              target="_blank"
              whileHover={{ y: -5 }}
            >
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
        </HeroContent>

        <HeroImageWrapper
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ImageContainer>
            <ProfileImage src={profileImage} alt="Profile" />
          </ImageContainer>
        </HeroImageWrapper>
      </HeroContainer>

      <ScrollIndicator
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Scroll Down
        <HiArrowDown />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;
