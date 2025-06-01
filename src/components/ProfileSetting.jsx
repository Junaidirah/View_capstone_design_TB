import React, { useState } from 'react';
import '../styles/Profile.css';

function ProfileSettings() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: '',
    agency: '',
    job: '',
    id: '',
    address: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('https://server-capstone-design-tb-sgnp.vercel.app/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (res.ok) {
        setMessage(result.message || 'Profile updated successfully!');
      } else {
        setMessage(result.message || 'Update failed!');
      }
    } catch {
      setMessage('Network error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="main-content">
        <header className="header">
          <div>Pages / Dashboard</div>
          <input
            type="search"
            className="search"
            placeholder="Search profile settings"
            aria-label="Search profile settings"
          />
          <div className="header-right">
            <span role="img" aria-label="Notifications">🔔</span>
            <span className="user-info">
              <img
                src="https://i.pinimg.com/originals/b3/04/f6/b304f6a384c6584c42ee508da6804b69.png"
                className="profile-img-mini"
                alt="Profile"
              />
              Aqilah Nasywa A.S
            </span>
          </div>
        </header>

        <section className="settings-container" aria-label="Account settings">
          <aside className="settings-sidebar" role="navigation" aria-label="Settings navigation">
            <ul>
              <li className="active"><span>👤</span> Profile Settings</li>
              <li><span>🔒</span> Password</li>
            </ul>
          </aside>
      <nav className="sidebar-left" aria-label="Main menu">
        <ul className="menu">
          <li><span>🏠</span> Dashboard</li>
          <li><span>🗺️</span> Maps</li>
          <li><span>📑</span> Data Aset</li>
          <li className="active"><span>⚙️</span> Settings</li>
        </ul>
        <div className="logout"><span>↩️</span> Log out</div>
      </nav>
          <section className="profile-settings">
            <form id="profile-form" onSubmit={handleSubmit} noValidate>
              <div className="profile-pic-section">
                <img
                  src="https://i.pinimg.com/originals/b3/04/f6/b304f6a384c6584c42ee508da6804b69.png"
                  alt="Profile"
                  className="profile-img"
                  id="profilePic"
                />
                <div className="btn-group">
                  <button type="button" id="uploadBtn" className="btn pink" disabled>
                    Upload New
                  </button>
                  <button type="button" id="deleteBtn" className="btn pink-outline" disabled>
                    Delete Profile
                  </button>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    id="mobile"
                    name="mobile"
                    placeholder="+62 896-1809-0504"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group gender-group">
                  <label>Gender</label>
                  <div className="gender-options">
                    <label htmlFor="genderMale">
                      <input
                        type="radio"
                        id="genderMale"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleChange}
                        required
                      />
                      Male
                    </label>
                    <label htmlFor="genderFemale">
                      <input
                        type="radio"
                        id="genderFemale"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleChange}
                      />
                      Female
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="agency">Agency</label>
                  <input
                    id="agency"
                    name="agency"
                    placeholder="Mayapada Hospital"
                    value={formData.agency}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="job">Job</label>
                  <input
                    id="job"
                    name="job"
                    placeholder="Doctor"
                    value={formData.job}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="id">ID</label>
                  <input
                    id="id"
                    name="id"
                    placeholder="Nurse"
                    value={formData.id}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: 2 }}>
                  <label htmlFor="address">Residential Address</label>
                  <textarea
                    id="address"
                    name="address"
                    placeholder="Pesona Bali, Bandung"
                    value={formData.address}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>
              </div>

              <button type="submit" id="saveBtn" className="btn pink" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>

              {message && <span id="profile-msg" className="profile-msg">{message}</span>}
            </form>
          </section>
        </section>
      </main>
    </>
  );
}

export default ProfileSettings;
