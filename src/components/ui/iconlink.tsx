import React from 'react'
export default function Iconflexlink({ icon, text, link }) {
  return (
    <div class="flex flex-row justify-evenly w-full text-center">
    <div class="shrink">
      {icon}
    </div>
    <div class="shrink">
      <a href={link}>{text}</a>
    </div>
    </div>
  )
}
