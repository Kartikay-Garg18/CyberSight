import { fetchThreats, fetchThreatDetails } from '../services/geminiService';

class ThreatController {
    async getThreats(req, res) {
        try {
            const threats = await fetchThreats();
            res.status(200).json(threats);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching threats', error });
        }
    }

    async getThreatDetails(req, res) {
        const { id } = req.params;
        try {
            const threatDetails = await fetchThreatDetails(id);
            if (!threatDetails) {
                return res.status(404).json({ message: 'Threat not found' });
            }
            res.status(200).json(threatDetails);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching threat details', error });
        }
    }
}

export default new ThreatController();