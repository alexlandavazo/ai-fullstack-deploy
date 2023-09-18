'use client'

import { updateEntry } from '@/utils/api'
import { useEffect, useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  const { mood, summary, color, subject, negative } = analysis
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
    { name: 'Color', value: color },
  ]

  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value === entry.content) return
      setIsLoading(true)

      const data = await updateEntry(entry.id, { content: _value })
      setAnalysis(data.analysis)

      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && <div>Loading... </div>}
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-full text-xl p-8"
        />
      </div>

      <div className="border-l border-black/10">
        <div className=" px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex px-2 py-4 items-center justify-between  border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
