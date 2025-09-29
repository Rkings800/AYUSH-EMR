// Basic user controller with mock data
export const getAllUsers = async (req, res) => {
  try {
    // Mock users data
    const users = [
      {
        id: '1',
        name: 'Dr. Smith',
        email: 'smith@hospital.com',
        role: 'doctor'
      },
      {
        id: '2',
        name: 'Dr. Johnson',
        email: 'johnson@hospital.com',
        role: 'doctor'
      }
    ];

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users'
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock user data
    const user = {
      id: id,
      name: 'Dr. Smith',
      email: 'smith@hospital.com',
      role: 'doctor',
      specialty: 'Cardiology'
    };

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user'
    });
  }
};