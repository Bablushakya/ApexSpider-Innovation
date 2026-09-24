import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DesktopTeam from '../components/desktop/Team';
import MobileTeam from '../components/mobile/Team';

describe('DesktopTeam component', () => {
  it('renders section eyebrow, heading, and description', () => {
    render(<DesktopTeam />);
    expect(screen.getByText('MEET THE TEAM')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /The People Behind ApexSpider/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A multidisciplinary team combining technology, design, data/i)
    ).toBeInTheDocument();
  });

  it('renders all four team members with names and designations', () => {
    render(<DesktopTeam />);
    expect(screen.getByRole('heading', { name: 'Bharat Singh' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Bablu Shakya' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Rahul Sahani' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Vishal' })).toBeInTheDocument();

    expect(screen.getByText('IT Engineer · Founder')).toBeInTheDocument();
    expect(screen.getByText('IT Engineer · Co-Founder')).toBeInTheDocument();
    expect(screen.getAllByText('IT Engineer').length).toBe(2);
  });

  it('renders accurate roles and focus areas', () => {
    render(<DesktopTeam />);
    expect(screen.getByText('Founder')).toBeInTheDocument();
    expect(screen.getByText('Technology Leadership & Business Strategy')).toBeInTheDocument();

    expect(screen.getByText('UI/UX & Operations')).toBeInTheDocument();
    expect(screen.getByText('Product Design, User Experience & Operations')).toBeInTheDocument();

    expect(screen.getByText('Data & Analytics')).toBeInTheDocument();
    expect(screen.getByText('Data Analytics, Business Intelligence & AI/ML')).toBeInTheDocument();

    expect(screen.getByText('Software Developer & Strategist')).toBeInTheDocument();
    expect(
      screen.getByText('Software Development, Technical Strategy & Digital Solutions')
    ).toBeInTheDocument();
  });

  it('renders proper accessible alt text for all team member images', () => {
    render(<DesktopTeam />);
    expect(
      screen.getByAltText('Bharat Singh, Founder at ApexSpider Innovation')
    ).toBeInTheDocument();
    expect(
      screen.getByAltText('Bablu Shakya, Co-Founder at ApexSpider Innovation')
    ).toBeInTheDocument();
    expect(
      screen.getByAltText('Rahul Sahani, Data & Analytics at ApexSpider Innovation')
    ).toBeInTheDocument();
    expect(
      screen.getByAltText('Vishal, Software Developer & Strategist at ApexSpider Innovation')
    ).toBeInTheDocument();
  });
});

describe('MobileTeam component', () => {
  it('renders mobile section header and all 4 team members', () => {
    render(<MobileTeam />);
    expect(screen.getByText('MEET THE TEAM')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /The People Behind ApexSpider/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Bharat Singh' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Bablu Shakya' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Rahul Sahani' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Vishal' })).toBeInTheDocument();
  });
});
