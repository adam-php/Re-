import React from 'react'
import Typography from '@components/ui/typography'
interface ContainerProps {
  features: Feature[],
  colors: string[],
interface FeatureProps {
  icon: React.ReactNode,
  headline: string,
  description: string,
}

const Container: React.FC<ContainerProps> = ({
  features,
  colors,
}) => {
  return (
    <div className="grid grid-cols-3">
    {features.map((element, index) => {
      <div>
    }
    )}
    </div>
  )
}

const Feature: React.FC<FeatureProps> = ({
  icon,
  headline,
  description
}) => {
  return (
    <div
      className="flex flex-col gap-6 text-left max-w-72 md:items-start
        items-center"
    >
      <div className="py-4 px-4 rounded-md border max-w-fit">
        {icon}
      </div>
      <Typography variant="h3">{headline}</Typography>
      <Typography variant="p" className="text-minor">
        {description}
      </Typography>
    </div>
  )
}

export default Feature
