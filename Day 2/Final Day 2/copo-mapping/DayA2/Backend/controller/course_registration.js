import { connection as db} from "../config/dbConfig.js"; 

export const addCourses = (req, res) => {
    const courses = req.body;
    const currentDate = new Date();
    if (!Array.isArray(courses) || courses.length === 0) {
        return res.status(400).json({ error: 'Invalid course data' });
    }
    console.log(courses)
    const query = 'INSERT INTO course (coursecode, course_name,created_time) VALUES ?';
    const values = courses.map(course => [course.course_code, course.course_name,currentDate]);

    db.query(query, [values], (error, results) => {
        if (error) {
            console.error('SQL Error:', error.message);
            return res.status(500).json({ error: 'Failed to add courses' });
        }

        res.json({ message: 'Courses added successfully', insertedRows: results.affectedRows });
    });
};