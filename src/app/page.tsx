import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import Image from 'next/image'
import Feature from './feature'
import { Users, NotebookPen, Bot, Text, MessageCircleMore, ClipboardList, FileJson } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div
      className="flex flex-col h-full md:py-36 md:px-32 pt-11 pb-24 px-8
        w-full items-center text-center gap-12"
    >
      <div className="flex flex-col gap-6 items-center">
        <Typography className="max-w-2xl" variant="h1">
          All-in-One Collaboration, Organization, and AI-Powered Workspace
        </Typography>
        <Typography className="max-w-2xl" variant="h5">
	Seamlessly integrating real-time collaboration with powerful organizational tools. Whether you're managing a team, building a community, or organizing personal projects, Re helps you stay connected and organized like never before.
        </Typography>
        <Link
          href="https://map.sistilli.dev/public/coding/SaaS+Boilerplate"
          target="_blank"
        >
          <Button size="tiny" variant="ghost">
            {`Get Started`}
          </Button>
        </Link>
        <Image
          width={1024}
          height={632}
          alt="Pandem.dev hero image"
          src="/hero1.png"
        />
      </div>
      <div className="flex flex-col md:pt-24 md:gap-36 gap-24 items-center">
        <div className="flex flex-col gap-12 items-center">
          <Typography className="max-w-2xl" variant="h1">
            Why Re?
          </Typography>
          <div className="flex md:flex-row flex-col gap-12">
            <Feature
              icon={<Users size={24} />}
              headline="Real-Time Communication & Collaboration"
	      description="Stay connected with your team or community using voice, video, and chat channels. Create custom servers with private channels, roles, and permissions. Collaborate in real-time, host virtual meetings, and keep everyone on the same page."
            />
            <Feature
              icon={<NotebookPen size={24} />}
              headline="Organize and Plan (Notion Features)"
              description="Keep all your tasks, notes, documents, and databases in one place. From wikis to task boards, manage your projects with flexible and intuitive tools. Create docs, track progress, and visually organize your life or business—all within Re."
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 max-w-2xl items-center">
          <Typography className="max-w-2xl" variant="h1">
            Next-Gen AI features
	  </Typography>
	  <Feature
              icon={<Bot size={24} />}
              headline="Smart Task Automation"
              description="Let AI handle repetitive tasks, deadlines, and reminders."
	  />
	  <Feature
              icon={<Text size={24} />}
              headline="Document Summarization"
              description="AI-powered tools summarize meeting notes, documents, and conversations, so you can focus on what matters most."
          />
	  <Feature
              icon={<MessageCircleMore size={24} />}
              headline="Contextual Suggestions"
              description="While you work, AI offers suggestions based on the context of your projects, boosting creativity and productivity."
          />
	  <Feature
              icon={<ClipboardList size={24} />}
              headline="Auto-generated Reports"
              description="Need a project update or meeting recap? Let the AI summarize and deliver a full report to your team instantly."
          />
	  <Feature
	      icon={<FileJson size={24}/>}
	      headline="Exclusive Access to Fine-Tuned Coding LLMs"
	      description="Level up your coding with Re's fine-tuned AI models. Whether you're a beginner or a pro, you can utilize cutting-edge AI-powered code assistance to auto-complete your code, debug in real-time, generate code snippets for complex tasks, or even learn with step-by-step explanations tailored to your level."
           />    
	  <Image
            width={1024}
            height={632}
            alt="Pandem.dev hero image"
            src="/hero1.png"
          />
        </div>
        <div className="flex flex-col gap-6 items-center">
          <Typography className="max-w-2xl" variant="h1">
            Get in touch
          </Typography>
          <div>Book a demo, or hop on a call</div>
          <Link
            href="https://map.sistilli.dev/public/coding/SaaS+Boilerplate"
            target="_blank"
          >
            <Button size="tiny" variant="ghost">
              {`Book now`}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
