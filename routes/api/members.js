
const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// get all mem
router.get('/', (req, res) => res.json(members));

// get sing mem
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
        }else{
            res.status(400).json({ msg: `No Member Found With id ${req.params.id}`});  

    }

});
// add a mem
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please inculde name and email' });
    }
    members.push(newMember);
    res.json(members);
});

// updat mem

router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMemder = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMemder.name : member.name;
                member.email = updMember.email ? updMemder.email : member.email;

                res.json({ msg: 'Member Updated', member});

            }
        });
        }else{
            res.status(400).json({ msg: `No Member Found With id ${req.params.id}`});  

    }
});

  // Delete Member
  router.delete('/:id', (req, res) => {
    const found = members.some(idFilter(req));
  
    if (found) {
      res.json({
        msg: 'Member deleted',
        members: members.filter(member => !idFilter(req)(member))
      });
    } else {
      res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
  });

module.exports = router;