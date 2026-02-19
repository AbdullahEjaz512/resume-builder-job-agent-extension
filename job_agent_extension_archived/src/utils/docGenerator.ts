import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  TabStopType,
  TabStopPosition,
} from 'docx';
import { saveAs } from 'file-saver';
import { Profile } from '../types';

export const createResumeBlob = async (profile: Profile): Promise<Blob> => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header: Name and Contact
          new Paragraph({
            text: profile.contact.fullName,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${profile.contact.email} | ${profile.contact.phone} | ${profile.contact.location}`,
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: profile.contact.linkedin,
                size: 22,
              }),
            ],
          }),
          new Paragraph({ text: '' }), // Spacer

          // Professional Summary
          new Paragraph({
            text: 'Professional Summary',
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
          }),
          new Paragraph({
            children: [new TextRun(profile.summary)],
          }),
          new Paragraph({ text: '' }),

          // Experience
          new Paragraph({
            text: 'Experience',
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
          }),
          ...profile.experience.flatMap((exp) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.company,
                  bold: true,
                  size: 24,
                }),
                new TextRun({
                  text: `\t${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
                  bold: true,
                }),
              ],
              tabStops: [
                {
                  type: TabStopType.RIGHT,
                  position: TabStopPosition.MAX,
                },
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.position,
                  italics: true,
                  size: 22,
                }),
              ],
            }),
            new Paragraph({
              children: [new TextRun(exp.description)],
            }),
            new Paragraph({ text: '' }),
          ]),

          // Education
          new Paragraph({
            text: 'Education',
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
          }),
          ...profile.education.flatMap((edu) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.school,
                  bold: true,
                  size: 24,
                }),
                new TextRun({
                  text: `\t${edu.graduationDate}`,
                  bold: true,
                }),
              ],
              tabStops: [
                {
                  type: TabStopType.RIGHT,
                  position: TabStopPosition.MAX,
                },
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.degree} in ${edu.field}`,
                  italics: true,
                }),
              ],
            }),
            new Paragraph({ text: '' }),
          ]),

          // Skills
          new Paragraph({
            text: 'Skills',
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
          }),
          new Paragraph({
            children: [new TextRun(profile.skills.join(', '))],
          }),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
};

export const generateResumeDoc = async (profile: Profile) => {
  const blob = await createResumeBlob(profile);
  saveAs(blob, `${profile.contact.fullName.replace(/\s+/g, '_')}_Resume.docx`);
};

export const generateCoverLetterDoc = async (text: string) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: text.split('\n').map((line) => new Paragraph({
            children: [new TextRun(line)],
            spacing: {
                after: 200
            }
        })),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'Cover_Letter.docx');
};
