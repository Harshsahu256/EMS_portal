// // src/components/CompanyRegistrationForm.jsx (adjust path as needed)
 
// import React, { useState, useEffect } from 'react';
// import {
//     Modal, Button, Form, Row, Col, Alert, Spinner, InputGroup
// } from 'react-bootstrap';
// import {
//     registerCompany, // The function you provided earlier
//     getAllCompanyCategories,
//     getAllCompanySubCategories,
// } from '../Services/authApi'; // Adjust this path if adminService is elsewhere
 
// // Helper to get the current token dynamically from localStorage
// const getToken = () => localStorage.getItem('token');
 
// // Helper to create authorized headers for FormData dynamically
// const getAuthHeadersForFormData = () => ({
//   headers: {
//     Authorization: `Bearer ${getToken()}`, // Har baar latest token fetch hoga
//   },
// });
 
// // A small custom hook for managing dynamic array inputs (e.g., social links, keywords)
// const useArrayInput = (initialValue = ['']) => {
//     const [items, setItems] = useState(initialValue);
 
//     const handleItemChange = (index, value) => {
//         const newItems = [...items];
//         newItems[index] = value;
//         setItems(newItems);
//     };
 
//     const addItem = () => setItems([...items, '']);
//     const removeItem = (index) => setItems(items.filter((_, i) => i !== index));
 
//     return [items, handleItemChange, addItem, removeItem, setItems];
// };
 
 
// const CompanyRegistrationForm = () => {
//     const [showModal, setShowModal] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
 
//     const [allCategories, setAllCategories] = useState([]);
//     const [allSubCategories, setAllSubCategories] = useState([]);
//     const [filteredSubCategories, setFilteredSubCategories] = useState([]);
 
//     const [formData, setFormData] = useState({
//         name: '', email: '', phone: '', password: '',
//         address: '', city: '', state: '', country: '',
//         gstNumber: '', aadhaarNumber: '',
//         category: '', subCategory: '', companyType: 'service', // Default to service
//         website: '', googleMapsLink: '', description: '',
//         // File objects
//         logo: null,
//         banner: [], // Array of files
//         aadhaar: null,
//         pan: null,
//         electricityBill: null,
//         passportPhoto: null,
//     });
 
//     const [socialLinks, handleSocialLinkChange, addSocialLink, removeSocialLink, setSocialLinks] = useArrayInput(['']);
//     const [keywords, handleKeywordChange, addKeyword, removeKeyword, setKeywords] = useArrayInput(['']);
 
//     const initialBusinessTimings = {
//         sunday: { open: '', close: '' }, monday: { open: '', close: '' },
//         tuesday: { open: '', close: '' }, wednesday: { open: '', close: '' },
//         thursday: { open: '', close: '' }, friday: { open: '', close: '' },
//         saturday: { open: '', close: '' },
//     };
//     const [businessTimings, setBusinessTimings] = useState(initialBusinessTimings);
 
//     useEffect(() => {
//         const fetchLookupData = async () => {
//             try {
//                 const categoriesRes = await getAllCompanyCategories();
//            setAllCategories(categoriesRes?.data || []);  
//           console .log("jane do ", categoriesRes)
//                 const subCategoriesRes = await getAllCompanySubCategories();
//                 setAllSubCategories(subCategoriesRes.data || []);
//             } catch (err) {
//                 console.error("Error fetching categories/subcategories:", err);
//                 setError("Failed to load categories or subcategories.");
//             }
//         };
//         fetchLookupData();
//     }, []);
 
//     // Filter subcategories based on selected category
//     useEffect(() => {
//         if (formData.category) {
//             const categoryObj = allCategories.find(cat => cat._id === formData.category);
//             setFormData(prev => ({ ...prev, companyType: categoryObj ? categoryObj.type : 'service' })); // Set companyType based on selected category
//             const filtered = allSubCategories.filter(
//                 sub => String(sub.parentCategory?._id || sub.parentCategory) === String(formData.category)
//             );
//             setFilteredSubCategories(filtered);
//             setFormData(prev => ({ ...prev, subCategory: '' })); // Reset subcategory when category changes
//         } else {
//             setFilteredSubCategories([]);
//         }
//     }, [formData.category, allCategories, allSubCategories]);
 
 
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };
 
//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         if (name === 'banner') {
//             setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: files[0] }));
//         }
//     };
 
//     const handleBusinessTimingChange = (day, field, value) => {
//         setBusinessTimings(prev => ({
//             ...prev,
//             [day]: { ...prev[day], [field]: value }
//         }));
//     };
 
//     const handleClose = () => {
//         setShowModal(false);
//         // Reset form after closing
//         setFormData({
//             name: '', email: '', phone: '', password: '',
//             address: '', city: '', state: '', country: '',
//             gstNumber: '', aadhaarNumber: '',
//             category: '', subCategory: '', companyType: 'service',
//             website: '', googleMapsLink: '', description: '',
//             logo: null, banner: [], aadhaar: null, pan: null,
//             electricityBill: null, passportPhoto: null,
//         });
//         setSocialLinks(['']);
//         setKeywords(['']);
//         setBusinessTimings(initialBusinessTimings);
//         setError('');
//         setSuccessMessage('');
//     };
 
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         setSuccessMessage('');
 
//         try {
//             const companyPayload = new FormData();
 
//             // Append all text/select fields
//             for (const key in formData) {
//                 // Skip file objects for now, handle them separately
//                 if (['logo', 'banner', 'aadhaar', 'pan', 'electricityBill', 'passportPhoto'].includes(key)) {
//                     continue;
//                 }
//                 if (formData[key]) {
//                     companyPayload.append(key, formData[key]);
//                 }
//             }
 
//             // Append JSON string fields
//             companyPayload.append('socialLinks', JSON.stringify(socialLinks.filter(link => link.trim() !== '')));
//             companyPayload.append('keywords', JSON.stringify(keywords.filter(keyword => keyword.trim() !== '')));
//             companyPayload.append('businessTimings', JSON.stringify(businessTimings));
 
//             // Append files
//             if (formData.logo) companyPayload.append('logo', formData.logo);
//             formData.banner.forEach(file => companyPayload.append('banner', file));
//             if (formData.aadhaar) companyPayload.append('aadhaar', formData.aadhaar);
//             if (formData.pan) companyPayload.append('pan', formData.pan);
//             if (formData.electricityBill) companyPayload.append('electricityBill', formData.electricityBill);
//             if (formData.passportPhoto) companyPayload.append('passportPhoto', formData.passportPhoto);
 
//             console.log("Submitting company registration payload (FormData)...");
//             // You can log FormData entries for debugging (not in production)
//             // for (let pair of companyPayload.entries()) {
//             //     console.log(pair[0]+ ', ' + pair[1]);
//             // }
 
//             // Use the registerCompany function from adminService
//             const res = await registerCompany(companyPayload);
//             setSuccessMessage(res.message || "Company registered successfully!");
//             // Optionally, clear form or redirect after success
//         } catch (err) {
//             console.error("Company Registration Failed:", err);
//             setError(err.response?.data?.message || err.message || "Registration failed. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };
 
//     const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
 
//     return (
//         <>
//             <Button variant="primary" onClick={() => setShowModal(true)}>
//                 Register Your Company
//             </Button>
 
//             <Modal show={showModal} onHide={handleClose} size="xl" centered scrollable backdrop="static">
//                 <Modal.Header closeButton>
//                     <Modal.Title>Company Registration</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {successMessage && <Alert variant="success">{successMessage}</Alert>}
//                     {error && <Alert variant="danger">{error}</Alert>}
 
//                     <Form onSubmit={handleSubmit}>
//                         {/* Basic Information */}
//                         <h4 className="mb-3">Basic Information</h4>
//                         <Row className="mb-3">
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label>Company Name</Form.Label>
//                                 <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
//                             </Form.Group>
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
//                             </Form.Group>
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label>Phone</Form.Label>
//                                 <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
//                             </Form.Group>
//                         </Row>
 
//                         <Row className="mb-3">
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
//                             </Form.Group>
//                              <Form.Group as={Col} md="4">
//                                 <Form.Label>Category</Form.Label>
//                                 <Form.Select name="category" value={formData.category} onChange={handleChange} required>
//                                     <option value="">Select Category</option>
//                                     {allCategories.map(cat => (
//                                         <option key={cat._id} value={cat._id}>{cat.name} ({cat.type})</option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label>SubCategory</Form.Label>
//                                 <Form.Select name="subCategory" value={formData.subCategory} onChange={handleChange} disabled={!formData.category || filteredSubCategories.length === 0}>
//                                     <option value="">Select SubCategory (Optional)</option>
 
//   {filteredSubCategories.map(subCat => (
//                                         <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                         </Row>
 
//                         {/* Address */}
//                         <h4 className="mb-3 mt-4">Address Details</h4>
//                         <Row className="mb-3">
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label>Address</Form.Label>
//                                 <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
//                             </Form.Group>
//                             <Form.Group as={Col} md="2">
//                                 <Form.Label>City</Form.Label>
//                                 <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} />
//                             </Form.Group>
//                             <Form.Group as={Col} md="2">
//                                 <Form.Label>State</Form.Label>
//                                 <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} />
//                             </Form.Group>
//                             <Form.Group as={Col} md="2">
//                                 <Form.Label>Country</Form.Label>
//                                 <Form.Control type="text" name="country" value={formData.country} onChange={handleChange} />
//                             </Form.Group>
//                         </Row>
 
//                         {/* Documents & Company Type */}
//                         <h4 className="mb-3 mt-4">Documents & Business Type</h4>
//                         <Row className="mb-3">
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label>GST Number</Form.Label>
//                                 <Form.Control type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
//                             </Form.Group>
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label>Aadhaar Number</Form.Label>
//                                 <Form.Control type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} />
//                             </Form.Group>
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label>Company Type</Form.Label>
//                                 <Form.Control type="text" value={formData.companyType} readOnly disabled />
//                                 <Form.Text className="text-muted">Automatically set by selected category.</Form.Text>
//                             </Form.Group>
//                         </Row>
 
//                         {/* Other Details */}
//                         <h4 className="mb-3 mt-4">Additional Details</h4>
//                         <Row className="mb-3">
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label>Website (URL)</Form.Label>
//                                 <Form.Control type="url" name="website" value={formData.website} onChange={handleChange} />
//                             </Form.Group>
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label>Google Maps Link</Form.Label>
//                                 <Form.Control type="url" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleChange} />
//                             </Form.Group>
//                         </Row>
 
//                         <Form.Group className="mb-3">
//                             <Form.Label>Description</Form.Label>
//                             <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
//                         </Form.Group>
 
//                         {/* Social Links */}
//                         <h5 className="mb-3 mt-4">Social Links</h5>
//                         {socialLinks.map((link, index) => (
//                             <InputGroup className="mb-2" key={`social-${index}`}>
//                                 <Form.Control
//                                     type="url"
//                                     placeholder="e.g., https://facebook.com/yourpage"
//                                     value={link}
//                                     onChange={(e) => handleSocialLinkChange(index, e.target.value)}
//                                 />
//                                 <Button variant="outline-danger" onClick={() => removeSocialLink(index)} disabled={socialLinks.length === 1}>
//                                     Remove
//                                 </Button>
//                             </InputGroup>
//                         ))}
//                         <Button variant="outline-secondary" size="sm" onClick={addSocialLink}>
//                             + Add Another Social Link
//                         </Button>
 
//                         {/* Keywords */}
//                         <h5 className="mb-3 mt-4">Keywords</h5>
//                         {keywords.map((keyword, index) => (
//                             <InputGroup className="mb-2" key={`keyword-${index}`}>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="e.g., digital marketing, web design"
//                                     value={keyword}
//                                     onChange={(e) => handleKeywordChange(index, e.target.value)}
//                                 />
//                                 <Button variant="outline-danger" onClick={() => removeKeyword(index)} disabled={keywords.length === 1}>
//                                     Remove
//                                 </Button>
//                             </InputGroup>
//                         ))}
//                         <Button variant="outline-secondary" size="sm" onClick={addKeyword}>
//                             + Add Another Keyword
//                         </Button>
 
//                         {/* Business Timings */}
//                         <h4 className="mb-3 mt-4">Business Timings</h4>
//                         {daysOfWeek.map(day => (
//                             <Row className="mb-2 align-items-center" key={day}>
//                                 <Col md="2">
//                                     <Form.Label className="text-capitalize">{day}</Form.Label>
//                                 </Col>
//                                 <Col md="5">
//                                     <Form.Control
//                                         type="time"
//                                         value={businessTimings[day].open}
//                                         onChange={(e) => handleBusinessTimingChange(day, 'open', e.target.value)}
//                                     />
//                                 </Col>
//                                 <Col md="5">
//                                     <Form.Control
//                                         type="time"
//                                         value={businessTimings[day].close}
//                                         onChange={(e) => handleBusinessTimingChange(day, 'close', e.target.value)}
//                                     />
//                                 </Col>
//                             </Row>
//                         ))}
 
//                         {/* File Uploads */}
//                         <h4 className="mb-3 mt-4">Upload Documents & Media</h4>
//                         <Row className="mb-3">
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label>Company Logo (Max 1)</Form.Label>
//                                 <Form.Control type="file" name="logo" accept="image/*" onChange={handleFileChange} />
//                             </Form.Group>
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label>Aadhaar Image (Max 1)</Form.Label>
//                                 <Form.Control type="file" name="aadhaar" accept="image/*,application/pdf" onChange={handleFileChange} />
//                             </Form.Group>
//                         </Row>
//                         <Row className="mb-3">
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label>PAN Image (Max 1)</Form.Label>
//                                 <Form.Control type="file" name="pan" accept="image/*,application/pdf" onChange={handleFileChange} />
//                             </Form.Group>
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label>Electricity Bill (Max 1)</Form.Label>
//                                 <Form.Control type="file" name="electricityBill" accept="image/*,application/pdf" onChange={handleFileChange} />
//                             </Form.Group>
//                         </Row>
//                         <Row className="mb-3">
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label>Passport Photo (Max 1)</Form.Label>
//                                 <Form.Control type="file" name="passportPhoto" accept="image/*" onChange={handleFileChange} />
//                             </Form.Group>
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label>Banner Images (Max 5)</Form.Label>
//                                 <Form.Control type="file" name="banner" accept="image/*" multiple onChange={handleFileChange} />
//                                 <Form.Text className="text-muted">You can select up to 5 banner images.</Form.Text>
//                             </Form.Group>
//                         </Row>
 
//                         <div className="d-flex justify-content-end mt-4">
//                             <Button variant="secondary" onClick={handleClose} className="me-2">
//                                 Close
//                             </Button>
//                             <Button variant="primary" type="submit" disabled={loading}>
//                                 {loading ? <Spinner animation="border" size="sm" /> : "Register Company"}
//                             </Button>
//                         </div>
//                     </Form>
//                 </Modal.Body>
//             </Modal>
//         </>
//     );
// };
 
// export default CompanyRegistrationForm;

import React, { useState, useEffect } from 'react';
import {
    Modal, Button, Form, Row, Col, Alert, Spinner, InputGroup
} from 'react-bootstrap';
import {
    registerCompany,
    getAllCompanyCategories,
    getAllCompanySubCategories,
    getStatesByCountry,
    getCitiesByState,
} from '../Services/authApi';

// Helper to get the current token dynamically from localStorage
const getToken = () => localStorage.getItem('token');

// Helper to create authorized headers for FormData dynamically (though registerCompany handles this internally if it's a direct API call)
// const getAuthHeadersForFormData = () => ({
//   headers: {
//     Authorization: `Bearer ${getToken()}`,
//   },
// });

// A small custom hook for managing dynamic array inputs (e.g., social links, keywords)
const useArrayInput = (initialValue = ['']) => {
    const [items, setItems] = useState(initialValue);

    const handleItemChange = (index, value) => {
        const newItems = [...items];
        newItems[index] = value;
        setItems(newItems);
    };

    const addItem = () => setItems([...items, '']);
    const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

    return [items, handleItemChange, addItem, removeItem, setItems];
};

// IMPORTANT: Updated with the correct _id for "India" from your backend database response.
const INDIA_DEFAULT_COUNTRY_ID = "687a1e2185f0230715032380";

const CompanyRegistrationForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [allCategories, setAllCategories] = useState([]);
    const [allSubCategories, setAllSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);

    const [allStates, setAllStates] = useState([]);
    const [allCities, setAllCities] = useState([]);

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '',
        address: '',
        city: '',
        state: '',
        country: INDIA_DEFAULT_COUNTRY_ID,
        gstNumber: '', aadhaarNumber: '',
        category: '', subCategory: '', companyType: 'service',
        website: '', googleMapsLink: '', description: '',
        logo: null,
        banner: [],
        aadhaar: null,
        pan: null,
        electricityBill: null,
        passportPhoto: null,
    });

    const [socialLinks, handleSocialLinkChange, addSocialLink, removeSocialLink, setSocialLinks] = useArrayInput(['']);
    const [keywords, handleKeywordChange, addKeyword, removeKeyword, setKeywords] = useArrayInput(['']);

    const initialBusinessTimings = {
        sunday: { open: '', close: '', isClosed: false },
        monday: { open: '', close: '', isClosed: false },
        tuesday: { open: '', close: '', isClosed: false },
        wednesday: { open: '', close: '', isClosed: false },
        thursday: { open: '', close: '', isClosed: false },
        friday: { open: '', close: '', isClosed: false },
        saturday: { open: '', close: '', isClosed: false },
    };
    const [businessTimings, setBusinessTimings] = useState(initialBusinessTimings);

    // Effect to fetch categories/subcategories and initial states for the default country (India)
    useEffect(() => {
        const fetchInitialLookupData = async () => {
            setLoading(true);
            setError('');
            try {
                const categoriesRes = await getAllCompanyCategories();
                setAllCategories(categoriesRes?.data || []);

                const subCategoriesRes = await getAllCompanySubCategories();
                setAllSubCategories(subCategoriesRes.data || []);

                if (INDIA_DEFAULT_COUNTRY_ID) {
                    const statesRes = await getStatesByCountry(INDIA_DEFAULT_COUNTRY_ID);
                    setAllStates(statesRes?.data || []);
                }
            } catch (err) {
                console.error("Error fetching initial lookup data:", err);
                setError(err.response?.data?.message || err.message || "Failed to load essential data (categories, subcategories, states).");
            } finally {
                setLoading(false);
            }
        };
        fetchInitialLookupData();
    }, []);

    // Effect to filter subcategories based on selected category
    useEffect(() => {
        if (formData.category) {
            const categoryObj = allCategories.find(cat => cat._id === formData.category);
            setFormData(prev => ({ ...prev, companyType: categoryObj ? categoryObj.type : 'service' }));
            const filtered = allSubCategories.filter(
                sub => String(sub.parentCategory?._id || sub.parentCategory) === String(formData.category)
            );
            setFilteredSubCategories(filtered);
            setFormData(prev => ({ ...prev, subCategory: '' }));
        } else {
            setFilteredSubCategories([]);
        }
    }, [formData.category, allCategories, allSubCategories]);

    // Effect to fetch cities when state changes
    useEffect(() => {
        const fetchCities = async () => {
            if (formData.state) {
                setLoading(true);
                setError('');
                try {
                    const citiesRes = await getCitiesByState(formData.state);
                    setAllCities(citiesRes?.data || []);
                    setFormData(prev => ({ ...prev, city: '' }));
                } catch (err) {
                    console.error(`Error fetching cities for state ${formData.state}:`, err);
                    setError(err.response?.data?.message || err.message || "Failed to load cities for the selected state.");
                } finally {
                    setLoading(false);
                }
            } else {
                setAllCities([]);
                setFormData(prev => ({ ...prev, city: '' }));
            }
        };
        fetchCities();
    }, [formData.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'banner') {
            setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleBusinessTimingChange = (day, field, value) => {
        setBusinessTimings(prev => ({
            ...prev,
            [day]: { ...prev[day], [field]: value }
        }));
    };

    const handleBusinessTimingToggleClosed = (day) => {
        setBusinessTimings(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                isClosed: !prev[day].isClosed,
                open: prev[day].isClosed ? '' : '09:00', // Default opening time if unchecking closed
                close: prev[day].isClosed ? '' : '17:00' // Default closing time if unchecking closed
            }
        }));
    };


    const handleClose = () => {
        setShowModal(false);
        setFormData({
            name: '', email: '', phone: '', password: '',
            address: '', city: '', state: '', country: INDIA_DEFAULT_COUNTRY_ID,
            gstNumber: '', aadhaarNumber: '',
            category: '', subCategory: '', companyType: 'service',
            website: '', googleMapsLink: '', description: '',
            logo: null, banner: [], aadhaar: null, pan: null,
            electricityBill: null, passportPhoto: null,
        });
        setSocialLinks(['']);
        setKeywords(['']);
        setBusinessTimings(initialBusinessTimings);
        setError('');
        setSuccessMessage('');
        setAllStates([]); // Clear states/cities on modal close to ensure fresh fetch next time
        setAllCities([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const companyPayload = new FormData();

            for (const key in formData) {
                if (['logo', 'banner', 'aadhaar', 'pan', 'electricityBill', 'passportPhoto'].includes(key)) {
                    continue;
                }
                if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
                    companyPayload.append(key, formData[key]);
                }
            }

            companyPayload.append('socialLinks', JSON.stringify(socialLinks.filter(link => link.trim() !== '')));
            companyPayload.append('keywords', JSON.stringify(keywords.filter(keyword => keyword.trim() !== '')));
            
            // Format business timings before appending
            const formattedTimings = {};
            for (const day in businessTimings) {
                if (businessTimings[day].isClosed) {
                    formattedTimings[day] = { open: 'Closed', close: 'Closed' };
                } else {
                    formattedTimings[day] = {
                        open: businessTimings[day].open || 'Closed', // Default to 'Closed' if empty
                        close: businessTimings[day].close || 'Closed'
                    };
                }
            }
            companyPayload.append('businessTimings', JSON.stringify(formattedTimings));

            if (formData.logo) companyPayload.append('logo', formData.logo);
            formData.banner.forEach(file => companyPayload.append('banner', file));
            if (formData.aadhaar) companyPayload.append('aadhaar', formData.aadhaar);
            if (formData.pan) companyPayload.append('pan', formData.pan);
            if (formData.electricityBill) companyPayload.append('electricityBill', formData.electricityBill);
            if (formData.passportPhoto) companyPayload.append('passportPhoto', formData.passportPhoto);

            console.log("Submitting company registration payload (FormData)...");
            for (let pair of companyPayload.entries()) {
                 console.log(pair[0]+ ', ' + pair[1]);
            }

            const res = await registerCompany(companyPayload);
            setSuccessMessage(res.message || "Company registered successfully!");
            // setTimeout(handleClose, 3000); // Auto-close after 3 seconds
        } catch (err) {
            console.error("Company Registration Failed:", err);
            setError(err.response?.data?.message || err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    return (
        <>
            <Button variant="outline-light" className="fw-bold py-2 px-4 rounded-pill" onClick={() => setShowModal(true)}>
                Register Your Company
            </Button>

            <Modal show={showModal} onHide={handleClose} size="xl" centered scrollable backdrop="static">
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>
                        <i className="bi bi-building me-2"></i> Company Registration
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        {/* Basic Information */}
                        <h4 className="mb-3 text-primary border-bottom pb-2">Basic Information</h4>
                        <Row className="mb-3 g-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">Company Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter company's legal name"
                                    required
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">Email <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="e.g., info@company.com"
                                    required
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">Phone <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="e.g., +91-9876543210"
                                    required
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-4 g-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">Password <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Set a password for company login"
                                    required
                                />
                            </Form.Group>
                             <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">Category <span className="text-danger">*</span></Form.Label>
                                <Form.Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                >
                                    <option value="">Select Category</option>
                                    {allCategories.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name} ({cat.type.charAt(0).toUpperCase() + cat.type.slice(1)})</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">SubCategory</Form.Label>
                                <Form.Select
                                    name="subCategory"
                                    value={formData.subCategory}
                                    onChange={handleChange}
                                    disabled={!formData.category || filteredSubCategories.length === 0 || loading}
                                >
                                    <option value="">Select SubCategory (Optional)</option>
                                    {filteredSubCategories.map(subCat => (
                                        <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        {/* Address Details - Country, State, City integrated */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Address Details</h4>
                        <Row className="mb-4 g-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Street, Building, Locality"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label className="fw-bold">Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    value="India"
                                    readOnly
                                    disabled
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label className="fw-bold">State <span className="text-danger">*</span></Form.Label>
                                <Form.Select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    disabled={loading || allStates.length === 0}
                                >
                                    <option value="">Select State</option>
                                    {allStates.map(s => (
                                        <option key={s._id} value={s._id}>{s.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label className="fw-bold">City <span className="text-danger">*</span></Form.Label>
                                <Form.Select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    disabled={!formData.state || allCities.length === 0 || loading}
                                >
                                    <option value="">Select City</option>
                                    {allCities.map(c => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        {/* Documents & Company Type */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Documents & Business Type</h4>
                        <Row className="mb-4 g-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">GST Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="gstNumber"
                                    value={formData.gstNumber}
                                    onChange={handleChange}
                                    placeholder="Optional: Enter GSTIN"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">Aadhaar Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="aadhaarNumber"
                                    value={formData.aadhaarNumber}
                                    onChange={handleChange}
                                    placeholder="Optional: Enter Aadhaar Number"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">Company Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.companyType.charAt(0).toUpperCase() + formData.companyType.slice(1)}
                                    readOnly
                                    disabled
                                    className="bg-light"
                                />
                                <Form.Text className="text-muted">
                                    Automatically set by selected category.
                                </Form.Text>
                            </Form.Group>
                        </Row>

                        {/* Other Details */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Additional Details</h4>
                        <Row className="mb-3 g-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Website (URL)</Form.Label>
                                <Form.Control
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="e.g., https://www.yourcompany.com"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Google Maps Link</Form.Label>
                                <Form.Control
                                    type="url"
                                    name="googleMapsLink"
                                    value={formData.googleMapsLink}
                                    onChange={handleChange}
                                    placeholder="Paste Google Maps URL here"
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Provide a brief description of your company and its services/products."
                            />
                        </Form.Group>

                        {/* Social Links */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Social Links</h4>
                        {socialLinks.map((link, index) => (
                            <InputGroup className="mb-2" key={`social-${index}`}>
                                <InputGroup.Text className="bg-light">
                                    <i className="bi bi-link-45deg"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="url"
                                    placeholder="e.g., https://facebook.com/yourpage"
                                    value={link}
                                    onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                                />
                                {socialLinks.length > 1 && (
                                    <Button variant="outline-danger" onClick={() => removeSocialLink(index)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                )}
                            </InputGroup>
                        ))}
                        <Button variant="outline-success" size="sm" onClick={addSocialLink} className="mb-4">
                            <i className="bi bi-plus-circle me-1"></i> Add Another Social Link
                        </Button>

                        {/* Keywords */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Keywords</h4>
                        <Form.Text className="text-muted mb-2 d-block">
                            Enter keywords that best describe your business (e.g., "digital marketing", "web design"). These help customers find you.
                        </Form.Text>
                        {keywords.map((keyword, index) => (
                            <InputGroup className="mb-2" key={`keyword-${index}`}>
                                <InputGroup.Text className="bg-light">
                                    <i className="bi bi-tag"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g., restaurant, plumbing, lawyer"
                                    value={keyword}
                                    onChange={(e) => handleKeywordChange(index, e.target.value)}
                                />
                                {keywords.length > 1 && (
                                    <Button variant="outline-danger" onClick={() => removeKeyword(index)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                )}
                            </InputGroup>
                        ))}
                        <Button variant="outline-success" size="sm" onClick={addKeyword} className="mb-4">
                            <i className="bi bi-plus-circle me-1"></i> Add Another Keyword
                        </Button>

                        {/* Business Timings */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Business Timings</h4>
                        <p className="text-muted">Set your opening and closing times for each day. Leave blank or check "Closed" if not applicable.</p>
                        {daysOfWeek.map(day => (
                            <Row className="mb-2 align-items-center g-2" key={day}>
                                <Col md="2">
                                    <Form.Check
                                        type="checkbox"
                                        label={<span className="text-capitalize fw-bold">{day}</span>}
                                        checked={businessTimings[day].isClosed}
                                        onChange={() => handleBusinessTimingToggleClosed(day)}
                                    />
                                </Col>
                                <Col md="5">
                                    <Form.Control
                                        type="time"
                                        value={businessTimings[day].open}
                                        onChange={(e) => handleBusinessTimingChange(day, 'open', e.target.value)}
                                        disabled={businessTimings[day].isClosed}
                                    />
                                </Col>
                                <Col md="5">
                                    <Form.Control
                                        type="time"
                                        value={businessTimings[day].close}
                                        onChange={(e) => handleBusinessTimingChange(day, 'close', e.target.value)}
                                        disabled={businessTimings[day].isClosed}
                                    />
                                </Col>
                            </Row>
                        ))}

                        {/* File Uploads */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Upload Documents & Media</h4>
                        <p className="text-muted">Upload required documents and media files for your company profile.</p>
                        <Row className="mb-3 g-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Company Logo (Max 1) <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="file" name="logo" accept="image/*" onChange={handleFileChange} required />
                                <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Aadhaar Image (Max 1)</Form.Label>
                                <Form.Control type="file" name="aadhaar" accept="image/*,application/pdf" onChange={handleFileChange} />
                                <Form.Text className="text-muted">Accepts image or PDF files.</Form.Text>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 g-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">PAN Image (Max 1)</Form.Label>
                                <Form.Control type="file" name="pan" accept="image/*,application/pdf" onChange={handleFileChange} />
                                <Form.Text className="text-muted">Accepts image or PDF files.</Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Electricity Bill (Max 1)</Form.Label>
                                <Form.Control type="file" name="electricityBill" accept="image/*,application/pdf" onChange={handleFileChange} />
                                <Form.Text className="text-muted">Accepts image or PDF files.</Form.Text>
                            </Form.Group>
                        </Row>
                        <Row className="mb-4 g-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Passport Photo (Max 1)</Form.Label>
                                <Form.Control type="file" name="passportPhoto" accept="image/*" onChange={handleFileChange} />
                                <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Banner Images (Max 5)</Form.Label>
                                <Form.Control type="file" name="banner" accept="image/*" multiple onChange={handleFileChange} />
                                <Form.Text className="text-muted">You can select up to 5 banner images (JPG, PNG).</Form.Text>
                            </Form.Group>
                        </Row>

                        <div className="d-flex justify-content-end mt-4 pt-3 border-top">
                            <Button variant="secondary" onClick={handleClose} className="me-2">
                                Close
                            </Button>
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? <><Spinner animation="border" size="sm" className="me-2" /> Registering...</> : "Register Company"}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CompanyRegistrationForm;