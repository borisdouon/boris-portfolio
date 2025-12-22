import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import aboutData from "../../../../content/about.json";
import skillsData from "../../../../content/skills.json";
import projectsData from "../../../../content/projects.json";

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "2pt solid #D4AF37",
    paddingBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 10,
  },
  contact: {
    fontSize: 10,
    color: "#666666",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#D4AF37",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#333333",
    marginBottom: 8,
  },
  skillCategory: {
    marginBottom: 10,
  },
  skillTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  skillList: {
    fontSize: 10,
    color: "#666666",
    lineHeight: 1.4,
  },
  projectItem: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: "1pt solid #eeeeee",
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 3,
  },
  projectRole: {
    fontSize: 10,
    color: "#D4AF37",
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 10,
    color: "#666666",
    lineHeight: 1.4,
    marginBottom: 5,
  },
  projectTech: {
    fontSize: 9,
    color: "#999999",
    fontStyle: "italic",
  },
  timelineItem: {
    marginBottom: 12,
    flexDirection: "row",
  },
  timelineYear: {
    width: 60,
    fontSize: 10,
    fontWeight: "bold",
    color: "#D4AF37",
  },
  timelineContent: {
    flex: 1,
  },
  timelineRole: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  timelineCompany: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 3,
  },
  timelineDescription: {
    fontSize: 9,
    color: "#666666",
    lineHeight: 1.3,
  },
});

// Helper function to create skill categories
const createSkillCategories = () => {
  const categories = skillsData.categories as Array<{ name: string; skills: { name: string; level: number; years: number }[] }>;
  return categories.map((categoryData, index) =>
    React.createElement(View, { key: index, style: styles.skillCategory },
      React.createElement(Text, { style: styles.skillTitle }, categoryData.name),
      React.createElement(Text, { style: styles.skillList },
        categoryData.skills.map(skill => skill.name).join(" • ")
      )
    )
  );
};

// Helper function to create project items
const createProjectItems = () => {
  return projectsData.projects.slice(0, 3).map((project, index) =>
    React.createElement(View, { key: index, style: styles.projectItem },
      React.createElement(Text, { style: styles.projectTitle }, project.title),
      React.createElement(Text, { style: styles.projectRole }, project.role),
      React.createElement(Text, { style: styles.projectDescription }, project.description),
      React.createElement(Text, { style: styles.projectTech },
        `Technologies: ${project.stack.join(", ")}`
      )
    )
  );
};

// Helper function to create timeline items
const createTimelineItems = () => {
  return aboutData.timeline.slice(0, 4).map((item, index) =>
    React.createElement(View, { key: index, style: styles.timelineItem },
      React.createElement(Text, { style: styles.timelineYear }, item.year),
      React.createElement(View, { style: styles.timelineContent },
        React.createElement(Text, { style: styles.timelineRole }, item.role),
        React.createElement(Text, { style: styles.timelineCompany }, item.company),
        React.createElement(Text, { style: styles.timelineDescription }, item.description)
      )
    )
  );
};

// Standard Resume Document
const ResumeDocument = () => 
  React.createElement(Document, null,
    React.createElement(Page, { size: "A4", style: styles.page },
      React.createElement(View, { style: styles.header },
        React.createElement(Text, { style: styles.name }, "Boris Douon"),
        React.createElement(Text, { style: styles.title }, "Full-Stack Developer & UI/UX Designer"),
        React.createElement(View, { style: styles.contact },
          React.createElement(Text, null, "boris@borisdouon.com"),
          React.createElement(Text, null, "Montreal, Canada"),
          React.createElement(Text, null, "linkedin.com/in/borisdouon")
        )
      ),

      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Professional Summary"),
        React.createElement(Text, { style: styles.text }, aboutData.bio)
      ),

      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Experience"),
        ...createTimelineItems()
      ),

      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Technical Skills"),
        ...createSkillCategories()
      ),

      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Featured Projects"),
        ...createProjectItems()
      ),

      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Education & Certifications"),
        React.createElement(Text, { style: styles.text },
          "• Bachelor's Degree in Computer Science - University of Montreal"
        ),
        React.createElement(Text, { style: styles.text },
          "• Google UX Design Professional Certificate"
        ),
        React.createElement(Text, { style: styles.text },
          "• AWS Certified Solutions Architect"
        )
      )
    )
  );

// Recruiter Mode Resume Document
const ResumeDocumentRecruiter = () => 
  React.createElement(Document, null,
    React.createElement(Page, { size: "A4", style: styles.page },
      React.createElement(View, { style: styles.header },
        React.createElement(Text, { style: styles.name }, "Boris Douon"),
        React.createElement(Text, { style: styles.title }, "AI & Software Engineer | Intelligent Systems | Full-Stack"),
        React.createElement(View, { style: styles.contact },
          React.createElement(Text, null, "douon2010@gmail.com"),
          React.createElement(Text, null, "Abidjan, Côte d'Ivoire"),
          React.createElement(Text, null, "6+ Years Experience"),
          React.createElement(Text, null, "Building Intelligent Systems at ADGroupe")
        )
      ),

      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Key Achievements"),
        React.createElement(Text, { style: styles.text }, "• Improved user engagement by 150% through UI/UX redesigns"),
        React.createElement(Text, { style: styles.text }, "• Led development of 3 award-winning web applications"),
        React.createElement(Text, { style: styles.text }, "• Reduced page load times by 60% through performance optimization"),
        React.createElement(Text, { style: styles.text }, "• Managed cross-functional teams of 5-8 developers and designers")
      ),

      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Core Technologies"),
        React.createElement(Text, { style: styles.text },
          "React • Next.js • TypeScript • Node.js • Python • PostgreSQL • AWS • Figma"
        )
      ),

      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Experience"),
        ...createTimelineItems()
      )
    )
  );

export async function GET() {
  try {
    const pdfDoc = pdf(React.createElement(ResumeDocument));
    const pdfBlob = await pdfDoc.toBlob();
    const pdfBuffer = Buffer.from(await pdfBlob.arrayBuffer());
    
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=Boris_Douon_Resume.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { recruiterMode = false } = await request.json();
    
    const DocumentComponent = recruiterMode ? ResumeDocumentRecruiter : ResumeDocument;
    const pdfDoc = pdf(React.createElement(DocumentComponent));
    const pdfBlob = await pdfDoc.toBlob();
    const pdfBuffer = Buffer.from(await pdfBlob.arrayBuffer());
    
    const filename = recruiterMode 
      ? "Boris_Douon_Resume_Recruiter.pdf" 
      : "Boris_Douon_Resume.pdf";
    
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${filename}`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
