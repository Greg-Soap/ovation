interface Experience {
  position: string
  companyLogo: string
  company: string
  startDate: string
  endDate: string
  details: string
  extendedDetails: string
}

export const experienceData: Experience[] = [
  {
    position: 'CEO',
    companyLogo: '/assets/images/profile/facebook.png',
    company: 'Facebook',
    startDate: 'May 2012',
    endDate: '',
    details: `Define the long-term goals and direction of the company. This
            includes identifying market opportun, assessing competitive
            landscapes, and determining the path for growth and innovation.`,
    extendedDetails: `Provide strong leadership to all departments within the company,
            fostering a culture of collaboratio, innovation, and accountability.
            Motivate employees to achieve their best and align their efforts
            with the company's objectives.`,
  },
  {
    position: 'CEO',
    companyLogo: '/assets/images/profile/x.png',
    company: 'X',
    startDate: 'May 2012',
    endDate: '',
    details: `Define the long-term goals and direction of the company. This
            includes identifying market opportun, assessing competitive
            landscapes, and determining the path for growth and innovation.`,
    extendedDetails: `Provide strong leadership to all departments within the company,
            fostering a culture of collaboratio, innovation, and accountability.
            Motivate employees to achieve their best and align their efforts
            with the company's objectives.`,
  },
]
