import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DesktopTeam from '../components/desktop/Team';
import MobileTeam from '../components/mobile/Team';

describe('DesktopTeam component', () => {
  it('renders section eyebrow, heading, and description', () => {
    render(<DesktopTeam />);
    expect(screen.getByText('OUR TEAM')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /People Behind the Technology/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A multidisciplinary team combining technology, design, data/i)
    ).toBeInTheDocument();
  });

  it('renders all four team members with names and roles', () => {
    render(<DesktopTeam />);
    expect(screen.getByRole('heading', { name: 'Bharat Singh' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Bablu' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Rahul Sahani' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Vishal' })).toBeInTheDocument();

    expect(screen.getByText('Founder')).toBeInTheDocument();
    expect(screen.getByText('Founding Member · UI/UX & Operations')).toBeInTheDocument();
    expect(screen.getByText('Founding Member · Data & Analytics')).toBeInTheDocument();
    expect(screen.getByText('Founding Member · Software Developer & Strategist')).toBeInTheDocument();
  });

  it('renders accurate focus areas', () => {
    render(<DesktopTeam />);
    expect(screen.getByText('Technology Leadership & Business Strategy')).toBeInTheDocument();
    expect(screen.getByText('Product Design · User Experience · Operations')).toBeInTheDocument();
    expect(screen.getByText('Data Analytics · Business Intelligence · AI/ML')).toBeInTheDocument();
    expect(
      screen.getByText('Software Development · Technical Strategy · Digital Solutions')
    ).toBeInTheDocument();
  });

  it('renders proper accessible alt text for all team member images', () => {
    render(<DesktopTeam />);
    expect(
      screen.getByAltText('Bharat Singh, Founder at ApexSpider Innovation')
    ).toBeInTheDocument();
    expect(
      screen.getByAltText('Bablu, Co-Founder · UI/UX & Operations at ApexSpider Innovation')
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
    expect(screen.getByText('OUR TEAM')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /People Behind the Technology/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Bharat Singh' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Bablu' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Rahul Sahani' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Vishal' })).toBeInTheDocument();
  });
});
