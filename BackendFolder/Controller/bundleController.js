// Simple bundle controller to handle FHIR bundle uploads
export const uploadBundle = async (req, res) => {
  try {
    console.log('Bundle upload request received');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const bundle = req.body;
    
    // Validate the bundle structure
    if (!bundle || !bundle.resourceType || bundle.resourceType !== 'Bundle') {
      console.log('Invalid bundle format:', bundle);
      return res.status(400).json({
        success: false,
        message: 'Invalid FHIR Bundle format'
      });
    }

    // Log the received bundle for debugging
    console.log('Received valid FHIR Bundle with', bundle.entry?.length || 0, 'entries');

    // Here you would typically save to database
    // For now, we'll just return success with the bundle data
    
    res.status(200).json({
      success: true,
      message: 'Bundle uploaded successfully',
      bundle: bundle,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Bundle upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload bundle',
      error: error.message
    });
  }
};

// Get bundle by ID (placeholder)
export const getBundle = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Placeholder - return mock data
    res.status(200).json({
      success: true,
      bundle: {
        resourceType: 'Bundle',
        id: id,
        type: 'collection',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Get bundle error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bundle'
    });
  }
};