import { Briefcase } from 'lucide-react'

import Iconflexlink from '../ui/iconlink'
export default function Sidebar() {
  return (
    <nav class="flex flex-col bg-stone-800 w-40 h-screen">
      <Iconflexlink
	icon={<Briefcase size={24}/> }
	text="Spaces"
	link="#"
	/>
	
    </nav>
  )
}
