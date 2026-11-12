import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
} from 'docx';
import { CVData } from '../data/cvData';

export async function downloadDocx(data: CVData) {
  // Helper to create clean section heading with bottom border
  const createSectionHeader = (title: string) => {
    return new Paragraph({
      spacing: { before: 240, after: 120 },
      border: {
        bottom: {
          color: '000000',
          space: 4,
          style: BorderStyle.SINGLE,
          size: 12,
        },
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22, // 11pt
          font: 'Calibri',
          color: '000000',
        }),
      ],
    });
  };

  const docChildren: Paragraph[] = [];

  // 1. Header (Name & Title)
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({
          text: `${data.name}, ${data.titleSuffix}`,
          bold: true,
          size: 32, // 16pt
          font: 'Calibri',
          color: '000000',
        }),
      ],
    })
  );

  // Subtitle / Headline
  if (data.headline) {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [
          new TextRun({
            text: data.headline,
            size: 19, // 9.5pt
            font: 'Calibri',
            color: '444444',
          }),
        ],
      })
    );
  }

  // Contact line
  const contactText = `${data.contact.phone}  |  ${data.contact.email}  |  ${data.contact.location}  |  LinkedIn: ${data.contact.linkedin}  |  Portfolio: ${data.contact.behance}`;
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
      children: [
        new TextRun({
          text: contactText,
          size: 18, // 9pt
          font: 'Calibri',
          color: '555555',
        }),
      ],
    })
  );

  // 2. PROFIL PROFESIONAL
  docChildren.push(createSectionHeader('Profil Profesional'));
  docChildren.push(
    new Paragraph({
      spacing: { before: 60, after: 140 },
      alignment: AlignmentType.JUSTIFIED,
      children: [
        new TextRun({
          text: data.summary,
          size: 20, // 10pt
          font: 'Calibri',
          color: '222222',
        }),
      ],
    })
  );

  // 3. PENGALAMAN KERJA
  docChildren.push(createSectionHeader('Pengalaman Kerja'));
  data.workExperience.forEach((job) => {
    // Role & Period
    docChildren.push(
      new Paragraph({
        spacing: { before: 100, after: 20 },
        children: [
          new TextRun({
            text: job.role,
            bold: true,
            size: 21,
            font: 'Calibri',
            color: '000000',
          }),
          new TextRun({
            text: `  —  ${job.period}`,
            bold: true,
            size: 19,
            font: 'Calibri',
            color: '444444',
          }),
        ],
      })
    );

    // Company & Location
    docChildren.push(
      new Paragraph({
        spacing: { before: 0, after: 60 },
        children: [
          new TextRun({
            text: job.company + (job.location ? ` | ${job.location}` : ''),
            italics: true,
            size: 19,
            font: 'Calibri',
            color: '555555',
          }),
        ],
      })
    );

    // Bullets
    job.bullets.forEach((bullet) => {
      docChildren.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { before: 20, after: 40 },
          children: [
            new TextRun({
              text: bullet,
              size: 20,
              font: 'Calibri',
              color: '222222',
            }),
          ],
        })
      );
    });
  });

  // 4. PENGALAMAN ORGANISASI & KEPEMIMPINAN
  if (data.organizationExperience && data.organizationExperience.length > 0) {
    docChildren.push(createSectionHeader('Pengalaman Organisasi & Kepemimpinan'));
    data.organizationExperience.forEach((org) => {
      docChildren.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({
              text: org.role,
              bold: true,
              size: 21,
              font: 'Calibri',
              color: '000000',
            }),
            new TextRun({
              text: `  —  ${org.period}`,
              bold: true,
              size: 19,
              font: 'Calibri',
              color: '444444',
            }),
          ],
        })
      );

      docChildren.push(
        new Paragraph({
          spacing: { before: 0, after: 40 },
          children: [
            new TextRun({
              text: org.organization,
              italics: true,
              size: 19,
              font: 'Calibri',
              color: '555555',
            }),
          ],
        })
      );

      org.bullets.forEach((b) => {
        docChildren.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 20, after: 40 },
            children: [
              new TextRun({
                text: b,
                size: 20,
                font: 'Calibri',
                color: '222222',
              }),
            ],
          })
        );
      });
    });
  }

  // 5. PENGALAMAN BISNIS & PENGAJARAN
  if (data.businessTeachingExperience && data.businessTeachingExperience.length > 0) {
    docChildren.push(createSectionHeader('Pengalaman Bisnis & Pengajaran'));
    data.businessTeachingExperience.forEach((biz) => {
      docChildren.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({
              text: biz.role,
              bold: true,
              size: 21,
              font: 'Calibri',
              color: '000000',
            }),
            new TextRun({
              text: `  —  ${biz.period}`,
              bold: true,
              size: 19,
              font: 'Calibri',
              color: '444444',
            }),
          ],
        })
      );

      docChildren.push(
        new Paragraph({
          spacing: { before: 0, after: 40 },
          children: [
            new TextRun({
              text: biz.entity,
              italics: true,
              size: 19,
              font: 'Calibri',
              color: '555555',
            }),
          ],
        })
      );

      biz.bullets.forEach((b) => {
        docChildren.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 20, after: 40 },
            children: [
              new TextRun({
                text: b,
                size: 20,
                font: 'Calibri',
                color: '222222',
              }),
            ],
          })
        );
      });
    });
  }

  // 6. PENDIDIKAN
  docChildren.push(createSectionHeader('Pendidikan'));
  data.education.forEach((edu) => {
    docChildren.push(
      new Paragraph({
        spacing: { before: 60, after: 40 },
        children: [
          new TextRun({
            text: edu.degree,
            bold: true,
            size: 20,
            font: 'Calibri',
            color: '000000',
          }),
          new TextRun({
            text: ` | ${edu.institution}`,
            size: 20,
            font: 'Calibri',
            color: '333333',
          }),
          ...(edu.honors
            ? [
                new TextRun({
                  text: ` | ${edu.honors}`,
                  bold: true,
                  size: 20,
                  font: 'Calibri',
                  color: '222222',
                }),
              ]
            : []),
          new TextRun({
            text: `  (${edu.period})`,
            italics: true,
            size: 19,
            font: 'Calibri',
            color: '555555',
          }),
        ],
      })
    );
  });

  // 7. KEAHLIAN
  docChildren.push(createSectionHeader('Keahlian'));
  data.skills.forEach((skill) => {
    docChildren.push(
      new Paragraph({
        spacing: { before: 40, after: 40 },
        children: [
          new TextRun({
            text: `${skill.category}: `,
            bold: true,
            size: 20,
            font: 'Calibri',
            color: '000000',
          }),
          new TextRun({
            text: skill.skills,
            size: 20,
            font: 'Calibri',
            color: '333333',
          }),
        ],
      })
    );
  });

  // 8. PELATIHAN & PENCAPAIAN
  docChildren.push(createSectionHeader('Pelatihan & Pencapaian'));
  data.trainingsAndAchievements.forEach((item) => {
    docChildren.push(
      new Paragraph({
        bullet: { level: 0 },
        spacing: { before: 20, after: 40 },
        children: [
          new TextRun({
            text: item,
            size: 20,
            font: 'Calibri',
            color: '222222',
          }),
        ],
      })
    );
  });

  // Create Word Document
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1000,
              right: 1000,
              bottom: 1000,
              left: 1000,
            },
          },
        },
        children: docChildren,
      },
    ],
  });

  // Generate Blob and trigger download
  const blob = await Packer.toBlob(doc);
  const cleanName = data.name.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `CV_${cleanName}.docx`;

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
