import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Users, Layout, User } from 'lucide-react';
import { Modal, Button, Form } from 'react-bootstrap';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    leader: '',
    project: '',
    members: ''
  });

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teams');
      setTeams(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teamData = {
        ...newTeam,
        members: newTeam.members.split(',').map(m => m.trim())
      };
      await axios.post('http://localhost:5000/api/teams', teamData);
      setShowModal(false);
      setNewTeam({ name: '', leader: '', project: '', members: '' });
      fetchTeams();
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <div className="pt-24 min-h-screen px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Hackathon Teams</h1>
            <p className="text-gray-400">View and join the innovative teams of Hack-O-Phobia.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center font-bold transition-all transform hover:scale-105"
          >
            <Plus className="mr-2" size={20} /> Register Team
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.length > 0 ? teams.map((team, idx) => (
              <motion.div
                key={team._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">{team.name}</h3>
                  <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">
                    ACTIVE
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-400 text-sm">
                    <User size={16} className="mr-2 text-blue-400" />
                    <span>Leader: <span className="text-gray-200">{team.leader}</span></span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Layout size={16} className="mr-2 text-blue-400" />
                    <span>Project: <span className="text-gray-200">{team.project}</span></span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Users size={16} className="mr-2 text-blue-400" />
                    <span>Members: <span className="text-gray-200">{team.members?.length || 0} participants</span></span>
                  </div>
                </div>

                <div className="flex -space-x-2 overflow-hidden mb-6">
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={i}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900"
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${team.name}${i}`}
                      alt=""
                    />
                  ))}
                </div>

                <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-all text-sm font-semibold">
                  View Details
                </button>
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-20 glass rounded-3xl">
                <Users className="mx-auto text-gray-600 mb-4" size={48} />
                <p className="text-gray-400">No teams registered yet. Be the first!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bootstrap Modal for Registration */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="dark-modal">
        <Modal.Header closeButton className="bg-slate-900 border-white/10 text-white">
          <Modal.Title className="font-bold">Register Your Team</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-slate-900 text-gray-300 p-6">
          <Form onSubmit={handleSubmit} className="space-y-4">
            <Form.Group>
              <Form.Label>Team Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter team name"
                className="bg-slate-800 border-white/10 text-white focus:bg-slate-800 focus:border-blue-500"
                value={newTeam.name}
                onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Leader Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter leader name"
                className="bg-slate-800 border-white/10 text-white focus:bg-slate-800 focus:border-blue-500"
                value={newTeam.leader}
                onChange={(e) => setNewTeam({...newTeam, leader: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="What are you building?"
                className="bg-slate-800 border-white/10 text-white focus:bg-slate-800 focus:border-blue-500"
                value={newTeam.project}
                onChange={(e) => setNewTeam({...newTeam, project: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Members (Comma separated)</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2}
                placeholder="Member 1, Member 2, ..."
                className="bg-slate-800 border-white/10 text-white focus:bg-slate-800 focus:border-blue-500"
                value={newTeam.members}
                onChange={(e) => setNewTeam({...newTeam, members: e.target.value})}
              />
            </Form.Group>
            <div className="pt-4">
              <Button variant="primary" type="submit" className="w-full bg-blue-600 border-none py-3 font-bold">
                Submit Registration
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <style>{`
        .dark-modal .modal-content {
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }
        .dark-modal .btn-close {
          filter: invert(1) grayscale(100%) brightness(200%);
        }
      `}</style>
    </div>
  );
};

export default Teams;
