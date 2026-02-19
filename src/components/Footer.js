import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const FooterSection = styled.footer`
  background: ${({ theme }) => theme.colors.background};
  padding: 60px 0 30px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 50px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterBrand = styled.div``;

const Logo = styled.a`
  font-size: 1.8rem;
  font-weight: 800;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  margin-bottom: 20px;
`;

const BrandDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 25px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    background: ${({ theme }) => theme.colors.gradient};
    border-color: transparent;
    transform: translateY(-3px);
  }
`;

const FooterColumn = styled.div``;

const ColumnTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 25px;
`;

const FooterLinks = styled.ul``;

const FooterLink = styled.li`
  margin-bottom: 12px;

  a {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: all 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      padding-left: 5px;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin-bottom: 30px;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    color: #ef4444;
    margin: 0 5px;
    vertical-align: middle;
  }
`;

const FooterNav = styled.div`
  display: flex;
  gap: 30px;

  a {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterSection>
      <Container>
        <FooterContent>
          <FooterBrand>
            <Logo href="#home">Abdullah Ejaz</Logo>
            <BrandDescription>
              Passionate AI Developer specializing in Machine Learning, 
              Deep Learning, and Computer Vision. Turning complex problems 
              into elegant solutions.
            </BrandDescription>
            <SocialLinks>
              <SocialLink href="https://github.com/AbdullahEjaz512" target="_blank" whileHover={{ y: -3 }}>
                <FaGithub />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/abdullah-ejaz-7b4791311" target="_blank" whileHover={{ y: -3 }}>
                <FaLinkedin />
              </SocialLink>
            </SocialLinks>
          </FooterBrand>

          <FooterColumn>
            <ColumnTitle>Quick Links</ColumnTitle>
            <FooterLinks>
              <FooterLink><a href="#home">Home</a></FooterLink>
              <FooterLink><a href="#about">About</a></FooterLink>
              <FooterLink><a href="#skills">Skills</a></FooterLink>
              <FooterLink><a href="#projects">Projects</a></FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Services</ColumnTitle>
            <FooterLinks>
              <FooterLink><a href="#services">Machine Learning</a></FooterLink>
              <FooterLink><a href="#services">Computer Vision</a></FooterLink>
              <FooterLink><a href="#services">Web Development</a></FooterLink>
              <FooterLink><a href="#services">Data Analysis</a></FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Contact</ColumnTitle>
            <FooterLinks>
              <FooterLink><a href="mailto:abdullahejaz512@gmail.com">Email Me</a></FooterLink>
              <FooterLink><a href="tel:+923365140129">Call Me</a></FooterLink>
              <FooterLink><a href="#contact">Get Quote</a></FooterLink>
              <FooterLink><a href="https://www.linkedin.com/in/abdullah-ejaz-7b4791311" target="_blank" rel="noopener noreferrer">LinkedIn</a></FooterLink>
            </FooterLinks>
          </FooterColumn>
        </FooterContent>

        <Divider />

        <FooterBottom>
          <Copyright>
            © {currentYear} <span>Abdullah Ejaz</span>. Made with <FaHeart /> All rights reserved.
          </Copyright>
          <FooterNav>
            <a href="#home">Privacy Policy</a>
            <a href="#home">Terms of Service</a>
          </FooterNav>
        </FooterBottom>
      </Container>
    </FooterSection>
  );
};

export default Footer;
