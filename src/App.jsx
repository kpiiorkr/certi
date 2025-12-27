import { useState } from 'react'
import jsPDF from 'jspdf'
import './App.css'

function App() {
  const [participantName, setParticipantName] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!participantName.trim()) {
      newErrors.participantName = '이름을 입력해주세요.'
    }
    
    if (!issueDate) {
      newErrors.issueDate = '발급일자를 선택해주세요.'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generatePDF = () => {
    if (!validateForm()) {
      return
    }

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // 배경색 설정
    pdf.setFillColor(245, 245, 245)
    pdf.rect(0, 0, pageWidth, pageHeight, 'F')

    // 테두리 설정
    pdf.setDrawColor(100, 100, 100)
    pdf.setLineWidth(2)
    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20)

    // 제목
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(28)
    pdf.setTextColor(0, 0, 0)
    pdf.text('CERTIFICATE OF COMPLETION', pageWidth / 2, 40, { align: 'center' })

    // 과정명
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(18)
    pdf.setTextColor(50, 50, 50)
    pdf.text('Data Literacy for University Students', pageWidth / 2, 55, { align: 'center' })
    pdf.text('DATA & CLOUD', pageWidth / 2, 65, { align: 'center' })

    // 구분선
    pdf.setDrawColor(150, 150, 150)
    pdf.setLineWidth(0.5)
    pdf.line(30, 75, pageWidth - 30, 75)

    // 본문 텍스트
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    pdf.text('This is to certify that', pageWidth / 2, 90, { align: 'center' })

    // 참가자 이름
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(20)
    pdf.setTextColor(0, 0, 139)
    pdf.text(participantName, pageWidth / 2, 105, { align: 'center' })

    // 본문 계속
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    pdf.text('has successfully completed the course', pageWidth / 2, 120, { align: 'center' })

    // 발급일자
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(11)
    pdf.setTextColor(50, 50, 50)
    pdf.text(`Issue Date: ${issueDate}`, pageWidth / 2, 140, { align: 'center' })

    // 기관 정보
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0)
    pdf.text('Korean Process Innovation Association', pageWidth / 2, 160, { align: 'center' })
    pdf.text('Founder Kang Seung-Won', pageWidth / 2, 168, { align: 'center' })

    // PDF 다운로드
    const fileName = `Certificate_${participantName}_${issueDate}.pdf`
    pdf.save(fileName)
  }

  const handleNameChange = (e) => {
    setParticipantName(e.target.value)
    if (errors.participantName) {
      setErrors({ ...errors, participantName: '' })
    }
  }

  const handleDateChange = (e) => {
    setIssueDate(e.target.value)
    if (errors.issueDate) {
      setErrors({ ...errors, issueDate: '' })
    }
  }

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>📜 수료증 발급 시스템</h1>
        
        <div className="form-group">
          <label htmlFor="participantName">참가자 이름 *</label>
          <input
            type="text"
            id="participantName"
            value={participantName}
            onChange={handleNameChange}
            placeholder="이름을 입력해주세요"
            className={errors.participantName ? 'input-error' : ''}
          />
          {errors.participantName && (
            <span className="error-message">{errors.participantName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="issueDate">발급일자 *</label>
          <input
            type="date"
            id="issueDate"
            value={issueDate}
            onChange={handleDateChange}
            className={errors.issueDate ? 'input-error' : ''}
          />
          {errors.issueDate && (
            <span className="error-message">{errors.issueDate}</span>
          )}
        </div>

        <button 
          onClick={generatePDF}
          className="download-button"
        >
          📥 수료증 다운로드
        </button>

        <div className="certificate-preview">
          <h3>📋 수료증 미리보기</h3>
          <div className="preview-content">
            <p className="preview-title">CERTIFICATE OF COMPLETION</p>
            <p className="preview-subtitle">Data Literacy for University Students</p>
            <p className="preview-subtitle">DATA & CLOUD</p>
            <hr />
            <p className="preview-text">This is to certify that</p>
            <p className="preview-name">{participantName || '참가자 이름'}</p>
            <p className="preview-text">has successfully completed the course</p>
            <p className="preview-date">Issue Date: {issueDate || 'YYYY-MM-DD'}</p>
            <p className="preview-organization">Korean Process Innovation Association</p>
            <p className="preview-organization">Founder Kang Seung-Won</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
