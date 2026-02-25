'use client'

import { useCallback, useState } from 'react'
import { Upload, FileSpreadsheet, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CsvUploadProps {
  onFileLoaded: (text: string) => void
}

export function CsvUpload({ onFileLoaded }: CsvUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState<string | null>(null)

  const handleFile = useCallback((file: File) => {
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      setFileContent(text)
    }
    reader.readAsText(file, 'UTF-8')
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file && (file.name.endsWith('.csv') || file.type === 'text/csv')) {
        handleFile(file)
      }
    },
    [handleFile],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  return (
    <div className="w-full max-w-xl">
        <div
          className={`relative w-full rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200 ${
            isDragging
              ? 'border-primary bg-primary/5 scale-[1.02]'
              : fileName
                ? 'border-primary/40 bg-primary/5'
                : 'border-border bg-card hover:border-primary/30 hover:bg-secondary/50 cursor-pointer'
          }`}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {!fileName ? (
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-medium text-foreground">
                  {'Arrastra tu archivo CSV aquí'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {'o haz clic para seleccionar'}
                </p>
              </div>
              <label className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>Seleccionar archivo</span>
                </Button>
                <input
                  type="file"
                  accept=".csv"
                  className="sr-only"
                  onChange={handleInputChange}
                />
              </label>
              <a
                href="https://drive.google.com/file/d/182Exqt23p4A0o-INOM-fsozXvHGFQgnU/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary underline-offset-2 hover:underline"
              >
                Archivo .csv
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <FileSpreadsheet className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-medium text-foreground">{fileName}</p>
                <p className="text-sm text-muted-foreground">
                  {'Archivo listo para procesar'}
                </p>
              </div>
              <div className="flex gap-3">
                <label className="cursor-pointer">
                  <Button variant="outline" size="sm" asChild>
                    <span>Cambiar archivo</span>
                  </Button>
                  <input
                    type="file"
                    accept=".csv"
                    className="sr-only"
                    onChange={handleInputChange}
                  />
                </label>
                <Button
                  size="sm"
                  onClick={() => {
                    if (fileContent) onFileLoaded(fileContent)
                  }}
                  className="gap-2"
                >
                  Generar presentación
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

    </div>
  )
}
